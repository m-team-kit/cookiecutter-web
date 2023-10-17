// TODO: only works with github repos, maybe gitlab
const resolveImage = (relativeUrl: string) =>
    `${
        process.env['NEXT_PUBLIC_TEMPLATE_REPOSITORY']?.replace('.git', '') ??
        'https://github.com/m-team-kit/templates-hub.git'
    }/raw/main/${relativeUrl}`;

export default resolveImage;
