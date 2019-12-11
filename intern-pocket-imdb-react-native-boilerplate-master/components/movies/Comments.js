import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getCommentsAction, commentsNewPageAction, setCurrPage } from '../../store/actions/MovieActions';
import makeSelectComments from '../../store/selectors/CommentsSelector';
import makeSelectNPagesComments from '../../store/selectors/NumberOfCommentPagesSelector';
import makeSeelctCommentsCurrentPage from '../../store/selectors/CommentsCurrentPageSelector';

const Comments = ({movie}) => {

    useEffect(() => {
        handleComments({movie, page:1});
      }, []);

    const dispatch = useDispatch();

    const handleShowMore = () => {
        handleComments({movie, page: parseInt(currentPage) + 1});
    }

    const handleComments = (params) => {
        dispatch(getCommentsAction(params));
    }

    const commentList = useSelector(makeSelectComments());
    const currentPage = useSelector(makeSeelctCommentsCurrentPage());
    const nOfPages = useSelector(makeSelectNPagesComments());

    const renderMovie = comment => (
        <Comment key={comment._id} comment={comment}></Comment>
    );
    return (<ScrollView>
        {commentList.map(renderMovie)}
        <TouchableOpacity onPress={handleShowMore} disabled={ currentPage >= nOfPages }><Text>Show more</Text></TouchableOpacity>
    </ScrollView>);
}

export default Comments;