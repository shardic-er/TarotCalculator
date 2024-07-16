import { questions } from "./question_data";
import {Affinity, ArcanaCategory} from "../common/enum";
import {arcana_categories} from "./catagory_data";

const data = questions;

test('bias test', () => {
    // Initialize a mapping to hold the point totals for each Arcana category
    const arcanaPoints: Record<ArcanaCategory, number> = {} as Record<ArcanaCategory, number>;

    // Initialize the points object dynamically based on arcana_categories
    arcana_categories.forEach((category: { id: ArcanaCategory; }) => {
        arcanaPoints[category.id as ArcanaCategory] = 0;
    });

    // Iterate over each question and its options to sum up the points for each Arcana category
    data.forEach(question => {
        question.options.forEach(option => {
            option.impacts.forEach(impact => {
                const categoryId = impact.categoryId as ArcanaCategory;
                // Don't count anti's
                const points = impact.points === Affinity.ANTI ? 0 : impact.points;
                arcanaPoints[categoryId] += points;
            });
        });
    });

    // Create a function to map enum keys to their string names
    const mapEnumToName = (enumObj: any) => {
        return Object.keys(enumObj)
            .filter(key => isNaN(Number(key))) // Filter out numeric keys
            .reduce((acc, key) => {
                acc[enumObj[key]] = key;
                return acc;
            }, {} as Record<number, string>);
    };

    const arcanaNames = mapEnumToName(ArcanaCategory);

    // Create a new object with names instead of numeric keys
    const namedArcanaPoints = Object.keys(arcanaPoints).reduce((acc, key) => {
        const numKey = Number(key) as ArcanaCategory;
        acc[arcanaNames[numKey]] = arcanaPoints[numKey];
        return acc;
    }, {} as Record<string, number>);

    // Print the results for visual inspection
    console.log(namedArcanaPoints);

    // Add assertions if needed, e.g., check that no Arcana category is overly favored
    const pointValues = Object.values(namedArcanaPoints);
    const maxPoints = Math.max(...pointValues);
    const minPoints = Math.min(...pointValues);

    // Adjust the threshold as needed
    const acceptableThreshold = 20; // Example threshold

    // Assert that the difference between max and min points is within an acceptable range
    expect(maxPoints - minPoints).toBeLessThanOrEqual(acceptableThreshold);

    // Optionally, you could add more sophisticated statistical tests here
    expect(true).toBe(true);
});
