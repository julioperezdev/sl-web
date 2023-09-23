export interface MenuFormData {
    imageName: string;
    title: string;
    options: MenuFormOption[];
    returnUrl: string;
}

interface MenuFormOption {
    optionsImage: string;
    optionHref: string;
    optionDescription: string;
}