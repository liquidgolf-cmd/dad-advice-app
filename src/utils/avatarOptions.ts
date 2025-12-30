export interface AvatarOption {
  id: string;
  emoji: string;
  label: string;
  skinTone: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'white-light',
    emoji: '👨🏻',
    label: 'Dad with Light Skin',
    skinTone: 'light',
  },
  {
    id: 'white-grey',
    emoji: '👨🏻‍🦳',
    label: 'Dad with Grey Hair',
    skinTone: 'light',
  },
  {
    id: 'white-red',
    emoji: '👨🏻‍🦰',
    label: 'Dad with Red Hair',
    skinTone: 'light',
  },
  {
    id: 'white-bald',
    emoji: '👨🏻‍🦲',
    label: 'Bald Dad',
    skinTone: 'light',
  },
  {
    id: 'medium-light',
    emoji: '👨🏼',
    label: 'Dad with Medium-Light Skin',
    skinTone: 'medium-light',
  },
  {
    id: 'medium',
    emoji: '👨🏽',
    label: 'Dad with Medium Skin',
    skinTone: 'medium',
  },
  {
    id: 'medium-dark',
    emoji: '👨🏾',
    label: 'Dad with Medium-Dark Skin',
    skinTone: 'medium-dark',
  },
  {
    id: 'dark',
    emoji: '👨🏿',
    label: 'Black Dad',
    skinTone: 'dark',
  },
  {
    id: 'older-light',
    emoji: '👴🏻',
    label: 'Older Dad with Light Skin',
    skinTone: 'light',
  },
  {
    id: 'older-medium',
    emoji: '👴🏽',
    label: 'Older Dad with Medium Skin',
    skinTone: 'medium',
  },
  {
    id: 'older-medium-dark',
    emoji: '👴🏾',
    label: 'Older Dad with Medium-Dark Skin',
    skinTone: 'medium-dark',
  },
  {
    id: 'older-dark',
    emoji: '👴🏿',
    label: 'Older Black Dad',
    skinTone: 'dark',
  },
];

export const DEFAULT_AVATAR = AVATAR_OPTIONS[5]; // Medium skin tone as default

export function getAvatarById(id: string): AvatarOption {
  return AVATAR_OPTIONS.find(avatar => avatar.id === id) || DEFAULT_AVATAR;
}

export function getAvatarEmoji(id: string): string {
  return getAvatarById(id).emoji;
}

