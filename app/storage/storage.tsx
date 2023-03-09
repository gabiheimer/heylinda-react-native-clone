// TODO: implement storage functions

export default class Storage {
  static async getFavourites(): Promise<string[]> {
    return [];
  }

  static async isFavourite(meditationId: string): Promise<boolean> {
    return true;
  }

  static async updateFavourites(meditationId: string): Promise<void> {}

  static async updateActivity(
    today: Date,
    duration: number
  ): Promise<Map<Date, number>> {
    return new Map();
  }
}
