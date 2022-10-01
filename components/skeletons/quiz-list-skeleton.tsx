import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function QuizListSkeleton() {
  return <Skeleton count={5} className="my-3" />;
}

export default QuizListSkeleton;
