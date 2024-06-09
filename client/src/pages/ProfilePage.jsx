import Navbar from "../components/Helpers/Navbar";
import {useParams} from "react-router-dom";
import ProfileNav from "../components/Profile/General/ProfileNav";
import ProfileBody from "../components/Profile/General/ProfileBody";
import ProfileSellings from "../components/Profile/Sellings/ProfileSellings";
import ProfileNewSelling from "../components/Profile/Sellings/ProfileNewSelling";
import ProfileSellingEdit from "../components/Profile/Sellings/ProfileSellingEdit";
import CreditCards from "../components/Profile/CreditCards/CreditCards";
import CreditCardsNew from "../components/Profile/CreditCards/CreditCardsNew";
import BetPage from "../components/Profile/Bets/BetPage";
import ProfileSellingBets from "../components/Profile/Sellings/ProfileSellingBets";
import ProfileDeals from "../components/Profile/Deals/ProfileDeals";
import DealDetails from "../components/Profile/Deals/DealDetails";

export default function ProfilePage() {
    const {subpage, action, name} = useParams();

    if (!subpage) {
            return (
                <div className="bg-cyan-50">
                    <Navbar/>
                    <ProfileNav/>
                    <ProfileBody/>
                </div>
            );
    }
    if (subpage === 'sellings') {
        return (
            <div className="bg-cyan-50">
                <Navbar/>
                <ProfileNav/>
                {!action && (
                    <ProfileSellings/>
                )}
                {action === 'new' && (
                    <ProfileNewSelling />
                )}
                {action && action !== 'new' && (
                    <ProfileSellingEdit />
                )}
            </div>
        );
    }
    if (subpage === 'selling') {
        return (
            <div className="bg-cyan-50">
                <Navbar />
                <ProfileNav/>
                {action && name === 'bets' && (
                    <ProfileSellingBets />
                )}
            </div>
        );
    }
    if (subpage === 'bets') {
        return (
            <div className="bg-cyan-50">
                <Navbar />
                <ProfileNav />
                <BetPage />
            </div>
        );
    }
    if (subpage === 'deals') {
        if (action == 'details') {
            return (
                <div className="bg-cyan-50">
                <Navbar />
                <ProfileNav />
                <DealDetails />
            </div>
            );
        }
        return (
            <div className="bg-cyan-50">
                <Navbar />
                <ProfileNav />
                <ProfileDeals />
            </div>
        );
    }
    if (subpage === 'credit-cards') {
        return (
            <div className="bg-cyan-50">
                <Navbar/>
                <ProfileNav/>
                {!action && (
                    <CreditCards/>
                )}
                {action === 'new' && (
                    <CreditCardsNew/>
                )}
            </div>
        );
    }
}