import iconIds from '$lib/assets/icons';
import { externalLinks } from '$lib/assets/links';
import { Garden } from '@vdg-webapp/common';

/**
 * Utility to get the base URL for the active garden.
 */
const getGardenBaseUrl = (gardenId: string): string => {
	return '/app/gardens/' + gardenId;
};

/**
 * Specifies the primary navigation tabs between feature domains.
 */
export type PrimaryTabSpec = {
	id: string;
	label: string;
	iconId: string;
	submenuItems: PrimaryTabItemSpec[] | null;
};

/**
 * Specifies the entries to the submenu of primary navigation tabs.
 */
export type PrimaryTabItemSpec = {
	url: string;
	label: string;
	iconId?: string;
	className?: string;
};

/* The maximum amount of gardens listed on the Gardens tab. */
const MAX_GARDENS_IN_TAB_SIDEBAR = 10;

/**
 * Constructs the tab which lists gardens the authenticated user has access to.
 * @param gardens list of garden schemas associated with the user.
 * @returns Tab specification for the gardens tab.
 */
export const getGardensAuthTab = (gardens: Garden[] = []): PrimaryTabSpec => {
	const viewAllSubmenuItem: PrimaryTabItemSpec = {
		url: getGardenBaseUrl(''),
		label: 'View All',
		className: 'underline'
	};
	const gardensSubmenuItems: PrimaryTabItemSpec[] = gardens
		.slice(0, MAX_GARDENS_IN_TAB_SIDEBAR)
		.map((garden) => ({
			label: garden.name,
			url: getGardenBaseUrl(garden.id),
			className: 'truncate italic'
		}));

	return {
		id: 'gardens',
		label: 'Gardens',
		iconId: iconIds.gardensIcon,
		submenuItems: [...gardensSubmenuItems, viewAllSubmenuItem]
	};
};

/**
 * Constructs the tab which lists gardens the anonymous user has access to.
 * @param gardens list of garden schemas associated with the user.
 * @returns Tab specification for the gardens tab.
 */
export const getGardensAnonTab = (): PrimaryTabSpec => {
	const discoverSubmenuItem: PrimaryTabItemSpec = {
		url: getGardenBaseUrl('discover'),
		label: 'Discover',
		iconId: iconIds.gardensIcon
	};
	return {
		id: 'gardens',
		label: 'Gardens',
		iconId: iconIds.gardensIcon,
		submenuItems: [discoverSubmenuItem]
	};
};

/**
 * Constructs the tabs of pages specific to one garden.
 * @param garden The active garden.
 * @returns Tab specifications for the garden tabs.
 */
export const getGardenSpecifcTabs = (garden: Garden): PrimaryTabSpec[] => {
	return [
		{
			id: 'garden',
			label: 'Garden',
			iconId: iconIds.gardenIcon,
			submenuItems: [
				{
					label: garden.name,
					url: getGardenBaseUrl(garden.id),
					className: 'truncate italic'
				},
				{
					label: 'Dashboard',
					url: getGardenBaseUrl(garden.id) + '/dash',
					iconId: iconIds.gardenDashboardIcon
				},
				{
					label: 'Members',
					url: getGardenBaseUrl(garden.id) + '/members',
					iconId: iconIds.gardenMembersIcon
				},
				{
					label: 'Metrics',
					url: getGardenBaseUrl(garden.id) + '/metrics',
					iconId: iconIds.gardenMetricsIcon
				}
			]
		},
		{
			id: 'planner',
			label: 'Planner',
			iconId: iconIds.gardenPlannerIcon,
			submenuItems: [
				{
					label: 'Verdagraph',
					url: getGardenBaseUrl(garden.id) + '/verdagraph',
					iconId: iconIds.gardenPlannerVerdagraphIcon
				},
				{
					label: 'Workbook',
					url: getGardenBaseUrl(garden.id) + '/workbook',
					iconId: iconIds.gardenPlannerWorkbookIcon
				}
			]
		},
		{
			id: 'config',
			label: 'Configuration',
			iconId: iconIds.gardenConfigIcon,
			submenuItems: [
				{
					label: 'Cultivars',
					iconId: iconIds.cultivarIcon,
					url: getGardenBaseUrl(garden.id) + '/cultivars'
				},
				{
					label: 'Workspaces',
					iconId: iconIds.workspaceIcon,
					url: getGardenBaseUrl(garden.id) + '/workspaces'
				},
				{
					label: 'Environments',
					iconId: iconIds.environmentIcon,
					url: getGardenBaseUrl(garden.id) + '/environments'
				}
			]
		}
	];
};

/**
 * @returns Tab specification for the traits tab.
 */
export const getTraitsTab = (): PrimaryTabSpec => {
	return {
		id: 'traits',
		label: 'Traits',
		iconId: iconIds.traitsIcon,
		submenuItems: [
			{
				label: 'Cultivars',
				iconId: iconIds.cultivarIcon,
				url: '/app/traits/cultivars'
			},
			{
				label: 'Workspaces',
				iconId: iconIds.workspaceIcon,
				url: '/app/traits/workspaces'
			},
			{
				label: 'Environments',
				iconId: iconIds.environmentIcon,
				url: '/app/traits/environments'
			}
		]
	};
};

/**
 * @returns Tab specifications for the resource tab.
 */
export const getResourcesTab = (): PrimaryTabSpec => {
	return {
		id: 'resources',
		label: 'Resources',
		iconId: iconIds.resourcesIcon,
		submenuItems: [
			{
				label: 'Guides',
				url: '/guides',
				iconId: iconIds.resourcesGuidesIcon
			},
			{
				label: 'Project',
				url: externalLinks.project,
				iconId: iconIds.resourcesProjectIcon
			},
			{
				label: 'Donate',
				url: externalLinks.donation,
				iconId: iconIds.resourcesDonateIcon
			}
		]
	};
};

/**
 * @returns Tab specification for the profile tab when a user is authenticated.
 */
export const getAuthProfileTab = (): PrimaryTabSpec => {
	return {
		id: 'profile',
		label: 'Profile',
		iconId: iconIds.profileIcon,
		submenuItems: [
			{
				label: 'Notifications',
				url: '/app/notifications',
				iconId: iconIds.profileNotificationsIcon
			},
			{
				label: 'Account',
				url: '/app/account',
				iconId: iconIds.profileAccountIcon
			},
			{
				label: 'Settings',
				url: '/app/settings',
				iconId: iconIds.profileSettingsIcon
			}
		]
	};
};

/**
 * @returns Tab specification for the profile tab when a user is not authenticated.
 */
export const getAnonProfileTab = (): PrimaryTabSpec => {
	{
		return {
			id: 'account',
			label: 'Account',
			iconId: iconIds.profileIcon,
			submenuItems: [
				{
					label: 'Login',
					url: '/login'
				},
				{
					label: 'Register',
					url: '/register'
				}
			]
		};
	}
};
