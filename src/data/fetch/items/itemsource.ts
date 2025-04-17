import api from "../base";

import type { ItemSourceSearch } from "@/types/meta";

export function itemSourceSearchFn(itemName: string) {
  return api
    .post(`/api/data/magicitem/source`, { item_name: itemName })
    .then((response) => {
      return response.data.sources as ItemSourceSearch[];
    });
}
