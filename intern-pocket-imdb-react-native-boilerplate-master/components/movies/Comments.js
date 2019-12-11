import React, { useEffect } from 'react';
import Comment from './Comment';
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from 'react-native-gesture-handler';
import { getCommentsAction } from '../../store/actions/MovieActions';
import makeSelectComments from '../../store/selectors/CommentsSelector';
import makeSeelctCommentsCurrentPage from '../../store/selectors/CommentsCurrentPageSelector';

const Comments = ({movie}) => {

    useEffect(() => {
        handleComments({movie, page:1});
      }, []);

    const dispatch = useDispatch();

    const handleComments = (params) => {
        dispatch(getCommentsAction(params));
    }

    const commentList = useSelector(makeSelectComments());
    const currentPage = useSelector(makeSeelctCommentsCurrentPage());

    // let commentsList = [
    // {
    //     id: 1,
    //     text: "Text",
    //     user: "user@gmail.com"
    // },
    // {
    //     id: 2,
    //     text: "Text1",
    //     user: "user1@gmail.com"
    // },
    // {
    //     id: 3,
    //     text: "Text2",
    //     user: "user2@gmail.com"
    // }];

    const renderMovie = comment => (
        <Comment key={comment._id} comment={comment}></Comment>
    );
    return <ScrollView>{commentList.map(renderMovie)}</ScrollView>;
}

export default Comments;