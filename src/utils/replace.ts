// Codigo para tornar um valor padrão em opicional no user.ts

export type Replace<OriginalType, ReplaceTypes> = Omit<
  OriginalType,
  keyof ReplaceTypes
> &
  ReplaceTypes;