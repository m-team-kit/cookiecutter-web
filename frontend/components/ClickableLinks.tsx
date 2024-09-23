import { type FC } from 'react';

type ClickableLinksProps = {
    text: string;
};
const ClickableLinks: FC<ClickableLinksProps> = ({ text }) => (
    <span
        dangerouslySetInnerHTML={{
            __html: text.replaceAll(
                /(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*[-a-zA-Z0-9()@:%_+~#?&//=]))/g,
                '<a href="$1">$1</a>'
            ),
        }}
    />
);

export default ClickableLinks;
