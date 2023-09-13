export type ObjectContentType = {
    date: string;
    title: string;
    more?: string;
    progress: "Not started" | "In progress" | "Completed";
    id: string;
};

export type DataType = ObjectContentType[];
