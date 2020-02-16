# Queries
auth = """"""
test = "SELECT * FROM test_table WHERE eventname=%s;"
update_events = "INSERT INTO events (eventname, date, starttime, endtime, location, description) VALUES(%s, %s, %s, %s, %s, %s);"
fetch_events = "SELECT * FROM events ORDER BY date;"
fetch_user_events = "SELECT * FROM user_events;"
fetch_post = "SELECT * FROM posts WHERE coord_x=%s AND coord_y=%s;"
fetch_all_posts = "SELECT * FROM posts ORDER BY rating DESC;"
fetch_location_name = "SELECT * FROM location WHERE coord_x=%s AND coord_y=%s;"
create_post = "INSERT INTO posts(coord_x, coord_y, comments, rating, username) VALUES(%s, %s, %s, %s, %s);"
upvote_post = "UPDATE posts SET rating = rating + 1 WHERE postid=%s;"
downvote_post = "UPDATE posts SET rating = rating - 1 WHERE postid=%s;"
create_user_event = "INSERT INTO user_events (eventname, date, starttime, endtime, coord_x, coord_y, description, username) VALUES(%s, %s, %s, %s, %s, %s, %s, %s);"


fetcher = {
        'auth': auth,
        'test': test,
        'fetch_events': fetch_events,
        'fetch_user_events': fetch_user_events,
        'fetch_all_posts': fetch_all_posts,
        'fetch_post': fetch_post,
        'fetch_location_name': fetch_location_name,
    }

updater = {
    'update_events': update_events,
    'create_post': create_post,
    'upvote_post': upvote_post,
    'downvote_post': downvote_post,
    'create_user_event': create_user_event,
}