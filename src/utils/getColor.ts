export const getColor = (date: string, theme: "light" | "dark") => {
    let themeColors;
    if (theme === "light")
        themeColors = {
            redish: "tomato",
            yellowish: "darkgoldenrod",
            greenish: "green",
        } as const;
    else themeColors = { redish: "tomato", yellowish: "darkgoldenrod", greenish: "green" } as const;

    type TypeOfColor = (typeof themeColors)[keyof typeof themeColors];
    let color: TypeOfColor;
    if (date === undefined) return;
    else if (new Date(date).valueOf() - new Date().valueOf() > 3 * 24 * 60 * 60 * 1000)
        color = themeColors.greenish;
    else if (new Date(date).valueOf() - new Date().valueOf() > 24 * 60 * 60 * 1000)
        color = themeColors.yellowish;
    else color = themeColors.redish;

    return color;
};
