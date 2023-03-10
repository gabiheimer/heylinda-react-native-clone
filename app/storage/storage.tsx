// TODO: implement storage functions

import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Storage {
  private static prefix = "meditation";
  private static favouritesKey = `${this.prefix}.favourites`;

  static async getFavourites(): Promise<string[]> {
    try {
      const storedFavs = await AsyncStorage.getItem(this.favouritesKey);
      const favouritedIds = JSON.parse(storedFavs ?? "[]");
      return favouritedIds;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async isFavourite(meditationId: string): Promise<boolean> {
    const favourites = await this.getFavourites();
    return favourites.includes(meditationId);
  }

  static async updateFavourites(meditationId: string): Promise<void> {
    const favourites = await this.getFavourites();
    const updatedFavs = [...favourites, meditationId];

    try {
      await AsyncStorage.setItem(
        this.favouritesKey,
        JSON.stringify(updatedFavs)
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async updateActivity(
    today: Date,
    duration: number
  ): Promise<Map<Date, number>> {
    return new Map();
  }
}
