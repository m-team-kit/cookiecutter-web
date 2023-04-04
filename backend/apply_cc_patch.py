#!/usr/bin/env python3
#
# -*- coding: utf-8 -*-
#
# Copyright (c) 2022-2023 Karlsruhe Institute of Technology - Steinbuch Centre for Computing
# This code is distributed under the MIT License
# Please, see the LICENSE file
#
# @author: vykozlov

# script to apply patch on cookiecutter/hooks.py

import cookiecutter as cc
from os import path
import subprocess

# base dir of the script
BASE_DIR = path.dirname(__file__)
# patches
CC_PATCH_DIR = path.join(BASE_DIR, "patches")
CC_DEFAULT_PATCH = path.join(CC_PATCH_DIR, "cc_hooks.patch")

# location of the cookiecutter python package
CC_PATH = path.dirname(cc.__file__)
# hooks.py
CC_HOOKS_PATH = path.join(CC_PATH, "hooks.py")
# cookiecutter version
CC_VERSION = cc.__version__.replace('.','')

# we may need patches for different cookiecutter versions
cc_patch_ver_path = path.join(CC_PATCH_DIR, F"cc_hooks_{CC_VERSION}.patch")
# if patch for the version does not exist, try default one
cc_patch_path = cc_patch_ver_path if path.isfile(cc_patch_ver_path) else CC_DEFAULT_PATCH

apply_patch = ["patch", CC_HOOKS_PATH, "-i", cc_patch_path]

try:
    p = subprocess.Popen(apply_patch,
                         stderr=subprocess.PIPE,
                         universal_newlines=True)
    out, err = p.communicate()
    exit_status = p.returncode
    if exit_status !=  0:
        raise Exception(F"{err}")
except Exception as e:
    raise Exception(str(e).strip())
else:
    print(F"Patch {cc_patch_path} applied!")