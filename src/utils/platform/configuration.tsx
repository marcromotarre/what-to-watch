import { Platforms, Platform } from "@/interfaces/Platform";
import { platform } from "os";

export const get_platform_index = ({
  platforms,
  platform_id,
}: {
  platforms: Platforms;
  platform_id: string;
}) => {
  return platforms.map(({ id }) => id).indexOf(platform_id);
};

export const copy_platforms = (platforms: Platforms): Platforms => {
  return JSON.parse(JSON.stringify(platforms));
};

export const save_platforms_to_local_storage = (platforms: Platforms): void => {
  localStorage.setItem("userPlatforms", JSON.stringify(platforms));
};

export const click_on_platform = ({
  platforms,
  platform_id,
}: {
  platforms: Platforms;
  platform_id: string;
}): Platforms => {
  const _platforms = copy_platforms(platforms);
  const platform_index = get_platform_index({
    platforms,
    platform_id,
  });
  _platforms[platform_index].has = !_platforms[platform_index].has;
  save_platforms_to_local_storage(_platforms);
  return _platforms;
};

export const set_platforms_order = ({
  platforms,
  platforms_order,
}: {
  platforms: Platforms;
  platforms_order: Array<string>;
}): Platforms => {
  const ordered_platforms: Platforms = [];
  platforms_order.forEach((platform_id) => {
    const platform_index = get_platform_index({
      platforms,
      platform_id,
    });
    ordered_platforms.push(platforms[platform_index]);
  });

  console.log(platforms.length, platforms_order.length, ordered_platforms.length)
  save_platforms_to_local_storage(ordered_platforms);
  return ordered_platforms;
};
