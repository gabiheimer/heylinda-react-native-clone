import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Storage {
  private static prefix = "meditation";
  private static favouritesKey = `${this.prefix}.favourites`;
  private static activityKey = `${this.prefix}.activity`;

  static async getFavourites(): Promise<string[]> {
    try {
      const storedFavs = await AsyncStorage.getItem(this.favouritesKey);
      const favouritedIds = JSON.parse(storedFavs ?? "[]");
      return favouritedIds;
    } catch (error) {
      return [];
    }
  }

  static async isFavourite(meditationId: string): Promise<boolean> {
    const favourites = await this.getFavourites();
    return favourites.includes(meditationId);
  }

  static async updateFavourites(meditationId: string): Promise<void> {
    const favourites = await this.getFavourites();
    let updatedFavs;

    if (favourites.includes(meditationId)) {
      updatedFavs = favourites.filter((id) => id !== meditationId);
    } else {
      updatedFavs = [...favourites, meditationId];
    }

    try {
      await AsyncStorage.setItem(
        this.favouritesKey,
        JSON.stringify(updatedFavs)
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async getActivity(): Promise<Map<string, number[]>> {
    try {
      const storedActivity = await AsyncStorage.getItem(this.activityKey);
      const jsonRes = JSON.parse(storedActivity ?? "{}");
      const res = new Map<string, number[]>(Object.entries(jsonRes));
      return res;
    } catch (error) {
      console.log(error);
      return new Map();
    }
  }

  static async updateActivity(
    date: string,
    duration: number
  ): Promise<Map<string, number[]>> {
    let activity = await this.getActivity();

    const durations = activity.get(date) ?? [];

    activity.set(date, [...durations, duration]);

    const activityObj = Object.fromEntries(activity);

    try {
      await AsyncStorage.setItem(this.activityKey, JSON.stringify(activityObj));
    } catch (error) {
      console.log(error);
    }

    return activity;
  }

  static async clearStorage(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error("Error clearing app data.");
    }
  }
}
