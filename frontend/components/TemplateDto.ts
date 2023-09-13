type TemplateDto = {
    id: string;
    repoFile: string;
    title: string;
    summary: string;
    language: string;
    tags: string[];
    picture: string;
    gitLink: string;
    gitCheckout: string;
    score: number;
};

export default TemplateDto;
