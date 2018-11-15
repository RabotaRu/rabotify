import "rabotify/src/util/helpers";
import Vue, { PluginFunction } from "vue";

declare class Rabotify {
  static install: PluginFunction<never>;
}

declare interface RabotifyApplication {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

declare interface RabotifyBreakpoint {
  name: string;
  height: number;
  width: number;
  xl: boolean;
  xlOnly: boolean;
  lg: boolean;
  lgAndDown: boolean;
  lgAndUp: boolean;
  lgOnly: boolean;
  md: boolean;
  mdAndDown: boolean;
  mdAndUp: boolean;
  mdOnly: boolean;
  sm: boolean;
  smAndDown: boolean;
  smAndUp: boolean;
  smOnly: boolean;
  xs: boolean;
  xsAndDown: boolean;
  xsAndUp: boolean;
  xsOnly: boolean;
}

declare interface RabotifyTheme {
  primary: string;
  accent: string;
  secondary: string;
  info: string;
  error: string;
  success: string;

  [name: string]: RabotifyThemeItem;
}


declare interface RabotifyObject {
  application: RabotifyApplication;
  breakpoint: RabotifyBreakpoint;
  scrollTo: (target: RabotifyScrollToElement, options?: RabotifyScrollToOptions) => void
}

declare type RabotifyThemeItem = string | number

declare type VueComponent = Vue;

declare type RabotifyScrollToElement = HTMLElement | Element | VueComponent | number | string;

declare interface RabotifyScrollToOptions {
  duration?: number;
  offset?: number;
  easing?: RabotifyScrollToEasing;
}

declare type RabotifyScrollToEasing =
  ((t: number) => number) |
    'linear' |
    'easeInQuad' |
    'easeOutQuad' |
    'easeInOutQuad' |
    'easeInCubic' |
    'easeOutCubic' |
    'easeInOutCubic' |
    'easeInQuart' |
    'easeOutQuart' |
    'easeInOutQuart' |
    'easeInQuint' |
    'easeOutQuint' |
    'easeInOutQuint';

declare module "vue/types/vue" {
  interface Vue {
    $rabotify: RabotifyObject;
  }
}

export default Rabotify;
