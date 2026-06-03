import {
  BuildingsIcon,
  ChartLineUpIcon,
  FileMagnifyingGlassIcon,
  UsersThreeIcon,
  DesktopIcon,
  ArrowsClockwiseIcon,
  GraduationCapIcon,
  CodeIcon,
  RobotIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon, IconProps } from "@phosphor-icons/react";

const REGISTRY: Record<string, PhosphorIcon> = {
  Buildings: BuildingsIcon,
  ChartLineUp: ChartLineUpIcon,
  FileMagnifyingGlass: FileMagnifyingGlassIcon,
  UsersThree: UsersThreeIcon,
  Desktop: DesktopIcon,
  ArrowsClockwise: ArrowsClockwiseIcon,
  GraduationCap: GraduationCapIcon,
  Code: CodeIcon,
  Robot: RobotIcon,
};

interface ServiceIconProps extends IconProps {
  name: string;
}

/** Resolves a Phosphor icon by the string name stored in services data. */
export function ServiceIcon({ name, ...props }: ServiceIconProps) {
  const Component = REGISTRY[name] ?? BuildingsIcon;
  return <Component {...props} />;
}
