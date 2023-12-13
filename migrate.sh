#!/bin/bash

set -e

LOG=/tmp/migrate.log

# 0. Define Variables
SCC_REMOTE_NAME_TEMP="old_scc_origin"
SCC_REMOTE_NAME=`git remote -vv | grep git.scc.kit.edu | awk '{ print $1 }' | uniq`
SCC_REMOTE=`git remote -vv | grep git.scc.kit.edu | awk '{ print $2 }' | uniq`
CURRENT_BRANCH=`git rev-parse --abbrev-ref HEAD`
# NEW_ORIGIN_REMOTE=`echo ${SCC_REMOTE} | sed s%git@git.scc.kit.edu:%git@codebase.helmholtz.cloud:${NEW_TOP_GROUP}/%`
NEW_ORIGIN_REMOTE=git@codebase.helmholtz.cloud:m-team/ai/cookiecutter-web.git # via templating
NEW_ORIGIN_GIT_USER_HOST=`echo git@codebase.helmholtz.cloud:m-team/ai/cookiecutter-web.git | awk -F: '{ print $1 }'`

# find new origin name:
[ "x${SCC_REMOTE_NAME}" == "xorigin" ] && {
    NEW_ORIGIN_NAME="origin"
}
[ "x${SCC_REMOTE_NAME}" == "xorigin" ] || {
    NEW_ORIGIN_NAME="codebase"
}


# echo "SCC_REMOTE_NAME $SCC_REMOTE_NAME"
# echo "SCC_REMOTE      $SCC_REMOTE"
# echo "NEW_ORIGIN_REMOTE git@codebase.helmholtz.cloud:m-team/ai/cookiecutter-web.git"
# echo "CURRENT_BRANCH  $CURRENT_BRANCH"

echo "Logging to $LOG"

echo -e "\n# 0. Check if there's an ssh key on the new remote" >> $LOG
ssh ${NEW_ORIGIN_GIT_USER_HOST} > /dev/null 2>&1 || {
    echo "Cannot connect to the new remote (using ${NEW_ORIGIN_GIT_USER_HOST}"
    echo "Are you sure you have uploaded your ssh key, already?"
    exit 1
}

echo -e "\n# 1. Add new git remote:" >> $LOG

echo "git remote rename ${SCC_REMOTE_NAME} ${SCC_REMOTE_NAME_TEMP}" >> $LOG
git remote rename ${SCC_REMOTE_NAME} ${SCC_REMOTE_NAME_TEMP}

echo "git remote add ${NEW_ORIGIN_NAME} git@codebase.helmholtz.cloud:m-team/ai/cookiecutter-web.git" >> $LOG
git remote add ${NEW_ORIGIN_NAME} git@codebase.helmholtz.cloud:m-team/ai/cookiecutter-web.git


    
echo -e "\n# 2. Undoing the last pull (that gave you this message)" >> $LOG
echo "git reset --hard ORIG_HEAD" >> $LOG
git reset --hard ORIG_HEAD >> $LOG 2>&1


echo -e "\n# 3. Set default branch to new remote" >> $LOG

echo "git fetch -a" >> $LOG
git fetch -a >> $LOG 2>&1

echo "git fetch ${NEW_ORIGIN_NAME}" >> $LOG
git fetch ${NEW_ORIGIN_NAME} >> $LOG 2>&1

echo "git branch --set-upstream-to=${NEW_ORIGIN_NAME}/${CURRENT_BRANCH} ${CURRENT_BRANCH}" >> $LOG
git branch --set-upstream-to=${NEW_ORIGIN_NAME}/${CURRENT_BRANCH} ${CURRENT_BRANCH} >> $LOG 2>&1


echo -e "\n# 4. Push to new remote" >> $LOG

echo "git push -u git@codebase.helmholtz.cloud:m-team/ai/cookiecutter-web.git ${CURRENT_BRANCH}" >> $LOG
git push -u git@codebase.helmholtz.cloud:m-team/ai/cookiecutter-web.git ${CURRENT_BRANCH} >> $LOG 2>&1

[ $? == 0 ] || {
    echo "Error pushing to new remote. Please consult $LOG"
}
echo -e "This branch is now migrated to git@codebase.helmholtz.cloud:m-team/ai/cookiecutter-web.git"


echo -e "\n# 5. Default other branches to git@codebase.helmholtz.cloud:m-team/ai/cookiecutter-web.git" >> $LOG
echo "git fetch ${NEW_ORIGIN_NAME}" >> $LOG
git fetch ${NEW_ORIGIN_NAME}

SCC_BRANCHES=`git branch -r \
    | grep -v HEAD \
    | grep ${SCC_REMOTE_NAME} \
    | awk '{ print $1 }' \
    | sed s_${SCC_REMOTE_NAME}/__`
LOCAL_SCC_BRANCHES=`git branch -vv \
    | sed s/*// \
    | grep ${SCC_REMOTE_NAME_TEMP} \
    | sed s%${SCC_REMOTE_NAME_TEMP}%% \
    | awk '{ print $1 }' \
    `
# echo "SCC_REMOTE_NAME:                  ${SCC_REMOTE_NAME}"
# echo "SCC_REMOTE_NAME_TEMP:             ${SCC_REMOTE_NAME_TEMP}"
# echo "SCC_REMOTE:                       ${SCC_REMOTE}"
# echo "LOCAL_SCC_BRANCHES:               ${LOCAL_SCC_BRANCHES}"
# echo "LOCAL_SCC_BRANCHES: ${LOCAL_SCC_BRANCHES}" >> $LOG
for CUR_BRANCH in ${LOCAL_SCC_BRANCHES}; do
    echo -n "Processing branch '${CUR_BRANCH}'"
    [ "x${CUR_BRANCH}" == "xHEAD" ] && {
        echo "Skipping ${CUR_BRANCH}" >> $LOG
    }
    [ "x${CUR_BRANCH}" == "xHEAD" ] || {
        echo git branch --set-upstream-to=${NEW_ORIGIN_NAME}/${CUR_BRANCH} ${CUR_BRANCH} >> $LOG
        git branch --set-upstream-to=${NEW_ORIGIN_NAME}/${CUR_BRANCH} ${CUR_BRANCH} >> $LOG 2>&1 || {
            echo -n "  => Skipping: local branch"
        }
        echo ""
    }
done


echo -e "\n# 6. Remove git.scc.kit.edu remote" >> $LOG
echo "git remote remove ${SCC_REMOTE_NAME_TEMP}" >> $LOG
git remote remove ${SCC_REMOTE_NAME_TEMP}


echo -e "\n\nMigration Done."
echo -e "This repository is now migrated to git@codebase.helmholtz.cloud:m-team/ai/cookiecutter-web.git"

