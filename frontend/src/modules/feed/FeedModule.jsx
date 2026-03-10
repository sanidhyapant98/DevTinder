import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFeed,
  nextUser,
  previousUser,
  removeCurrentUser,
} from '../../store/feedSlice';
import { sendConnectionRequest } from '../../store/requestsSlice';
import UserCard from './UserCard';
import { Heart } from 'lucide-react';

export default function FeedModule() {
  const dispatch = useDispatch();
  const { users, currentUserIndex, isLoading, error, hasMore, currentPage } = useSelector(
    (state) => state.feed
  );
  const { actionLoading } = useSelector((state) => state.requests);
  const [actionInProgress, setActionInProgress] = useState(false);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const currentUser = users[currentUserIndex];

  const handleInterested = async () => {
    if (!currentUser) return;
    setActionInProgress(true);
    try {
      const result = await dispatch(
        sendConnectionRequest({
          toUserId: currentUser._id,
          status: 'interested',
        })
      ).unwrap();
      dispatch(removeCurrentUser());
    } catch (error) {
      // Typically we'd call a toast notification here
      console.error('Failed to send interest:', error);
    } finally {
      setActionInProgress(false);
    }
  };

  const handleIgnore = () => {
    dispatch(removeCurrentUser());
  };

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore && currentUserIndex >= users.length - 3) {
      dispatch(fetchFeed({ page: currentPage + 1 }));
    }
  }, [dispatch, isLoading, hasMore, currentUserIndex, currentPage]);

  useEffect(() => {
    handleLoadMore();
  }, [handleLoadMore, currentUserIndex]);

  if (isLoading && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (!currentUser && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 to-pink-50">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-2">No more users</p>
          <p className="text-gray-600">Check back later!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {currentUser ? (
          <div className="space-y-6 animate-fade-in">
            <UserCard user={currentUser} />

            {/* Action buttons */}
            <div className="flex justify-between gap-4">
              <button
                onClick={handleIgnore}
                disabled={actionInProgress || actionLoading}
                className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Pass
              </button>
              <button
                onClick={handleInterested}
                disabled={actionInProgress || actionLoading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {actionInProgress ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 fill-white" />
                    <span>Interested</span>
                  </>
                )}
              </button>
            </div>

            {/* Progress indicator */}
            <div className="text-center text-sm text-gray-600">
              Showing {currentUserIndex + 1} of {users.length}
              {hasMore && ' (More coming)'}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-800 mb-4">No more profiles</p>
            {isLoading && <p className="text-gray-600">Loading more users...</p>}
          </div>
        )}
      </div>
    </div>
  );
}