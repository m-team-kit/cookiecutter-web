import { createContext, type FC, type PropsWithChildren, useContext } from 'react';

type IssueTemplateContextType = {
    issueTemplate: string;
};
const IssueTemplateContext = createContext<IssueTemplateContextType | null>(null);

export const useIssueTemplate = (): IssueTemplateContextType => {
    const context = useContext(IssueTemplateContext);
    if (!context) {
        throw new Error('useIssueTemplate must be used within a IssueTemplateProvider');
    }
    return context;
};

type IssueTemplateContextProviderProps = {
    issueTemplate: string;
};
export const IssueTemplateContextProvider: FC<
    PropsWithChildren<IssueTemplateContextProviderProps>
> = ({ issueTemplate, children }) => (
    <IssueTemplateContext.Provider value={{ issueTemplate }}>
        {children}
    </IssueTemplateContext.Provider>
);
