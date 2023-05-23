import { Platforms, Platform } from "@/interfaces/Platform";
import { platform } from "os";

export const get_platform_index = ({
  platform_id,
}: {
  platform_id: string;
}) => {
  return get_platforms().map(({ id }) => id).indexOf(platform_id);
};

export const copy_platforms = (platforms: Platforms): Platforms => {
  return JSON.parse(JSON.stringify(platforms));
};

export const get_platforms = (): Platforms => {
  const userPlatforms = localStorage.getItem("userPlatforms")
  if(userPlatforms) {
    const _platforms = JSON.parse(userPlatforms)
    return _platforms
  } else {
    return []
  }
};

export const save_platforms_to_local_storage = (platforms: Platforms): void => {
  localStorage.setItem("userPlatforms", JSON.stringify(platforms));
};

export const click_on_platform = ({
  platform_id,
}: {
  platform_id: string;
}): Platforms => {
  const platforms = get_platforms()
  const platform_index = get_platform_index({
    platform_id,
  });
  platforms[platform_index].has = !platforms[platform_index].has;
  save_platforms_to_local_storage(platforms);
  return platforms;
};

export const set_platforms_order = ({
  platforms_order,
}: {
  platforms_order: Array<string>;
}): Platforms => {
  const platforms = get_platforms()
  const ordered_platforms: Platforms = [];
  platforms_order.forEach((platform_id) => {
    const platform_index = get_platform_index({
      platform_id,
    });
    ordered_platforms.push(platforms[platform_index]);
  });

  console.log(
    platforms.length,
    platforms_order.length,
    ordered_platforms.length
  );
  save_platforms_to_local_storage(ordered_platforms);
  return ordered_platforms;
};
