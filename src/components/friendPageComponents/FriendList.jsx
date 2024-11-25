import { useSelector } from "react-redux";
import FriendListContainer from "./FriendListContainer";

const FriendList = () => {
    const friendList = useSelector(
        (state) => state.friendsDataSlice.friendList
    );

    return (
        <div className="friend-page-list">
            <div className="friend-list-header">
                Friends{" "}
                {friendList != null && <span>({friendList.length})</span>}
            </div>
            <FriendListContainer />
        </div>
    );
};

export default FriendList;