import LifeQualityExplore from './pages/LifeQualityExplore';
import SocialSurveyCompare from './pages/SocialSurveyCompare';
import Spotlight from './pages/Spotlight';
import DataExplorer from './pages/DataExplorer';
import MunicipalityMap from './pages/MunicipalityMap';
import LifeQualityIndex from './pages/LifeQualityIndex';
import Home from './pages/Home';
import BotAdmin from './pages/BotAdmin';
import NotFound from './pages/NotFound';
import __Layout from './Layout.jsx';


export const PAGES = {
    "LifeQualityExplore": LifeQualityExplore,
    "SocialSurveyCompare": SocialSurveyCompare,
    "Spotlight": Spotlight,
    "DataExplorer": DataExplorer,
    "MunicipalityMap": MunicipalityMap,
    "LifeQualityIndex": LifeQualityIndex,
    "Home": Home,
    "BotAdmin": BotAdmin,
    "NotFound": NotFound,
}

export const pagesConfig = {
    mainPage: "LifeQualityExplore",
    Pages: PAGES,
    Layout: __Layout,
};