
export interface IComment {
  owner: string;
  text: string;
}

export interface IPostCommentsModalProps {
    postId: string;
    isOpen: boolean;
    closeModal: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}

export interface IPost {
  id: string;
  author: string;
  startTime: string;
  endTime: string;
  workout: string;
  details: string;
  imageUrl: string;
}

export interface IProfile {
  id:string;
  name: string;
  email: string;
  photo: string;
  height: string;
  whight: string;
  gender: 'male' | 'female';
}

export interface IExercise {
    name: string;
    sets: string | number;
    reps: string;
  }

  export interface IGuideline {
    name: string;
    details: string;
  }

  export interface ISchedule {
    day: string;
    workout: string;
  }