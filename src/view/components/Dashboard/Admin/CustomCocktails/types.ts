export type Ingredients =
  | {
      name: string;
      amount: number;
    }[]
  | undefined;

export type SetIngredients = (
  value: React.SetStateAction<
    | {
        name: string;
        amount: number;
      }[]
    | undefined
  >
) => void;
