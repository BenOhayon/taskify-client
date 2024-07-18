import { PageConfigMapper } from "../types/types";
import { FORGOT_PASSWORD_PAGE_ROUTE, HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE, REGISTER_PAGE_ROUTE, SETTINGS_PAGE_ROUTE, TASKS_PAGE_ROUTE } from "./routes.constants";

export const PAGES_CONFIG: PageConfigMapper = {
    [HOME_PAGE_ROUTE]: {
        styles: {}
    },
    [TASKS_PAGE_ROUTE]: {
        styles: {
            padding: '20px 20px 0 20px'
        }
    },
    [SETTINGS_PAGE_ROUTE]: {
        styles: {}
    },
    [LOGIN_PAGE_ROUTE]: {
        styles: {
            maxWidth: '650px',
            width: '100%',
            height: '100%'
        }
    },
    [REGISTER_PAGE_ROUTE]: {
        styles: {
            maxWidth: '650px',
            width: '100%',
            height: '100%'
        }
    },
    [FORGOT_PASSWORD_PAGE_ROUTE]: {
        styles: {
            maxWidth: '650px',
            width: '100%',
            height: '100%'
        }
    }
}

export const SIDEBAR_WIDTH_THRESHOLD_PX = 600
export const SIDEBAR_WIDTH_PX = 240
export const SIDEBAR_MINIMIZED_WIDTH_PX = 60

export const LOADER_DEFAULT_WIDTH_PX = 20
export const LOADER_DEFAULT_HEIGHT_PX = 20

export const DIALOG_TRANSITION_DURATION_MILLISECONDS = 250