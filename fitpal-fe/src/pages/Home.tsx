import NewPostButton from "../components/newPostButton/NewPostButton";
import { IPost } from "../types";
import Post from "../components/post";

const temp: IPost[] = [
  {
    postId: "1",
    owner: "Gal Yaakov",
    photo: "",
    title: "Workout finished",
    time: "1:15:00",
    workout: "Full Body",
    details: "Today was a good Workout",
  },
  {
    postId: "2",
    owner: "Yoav David",
    photo: "",
    title: "Workout finished",
    time: "1:15:00",
    workout: "Upper Body",
    details: "Today was a good Workout",
  },
  {
    postId: "3",
    owner: "Ido Sharon",
    photo: "",
    title: "Workout finished",
    time: "4:15:00",
    workout: "Only ass",
    details: "Today was a good Workout",
  },
];

const Home = () => {
  return (
    <>
      <div id="home-page">
        {temp.map((post: IPost) => {
          return <Post key={post.postId} props={post} />;
        })}
      </div>
      <NewPostButton />
    </>
  );
};
export default Home;
