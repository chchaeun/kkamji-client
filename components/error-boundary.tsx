import { AxiosError } from "axios";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorCode: number | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorCode: null,
  };

  public static getDerivedStateFromError(error: AxiosError): State {
    return { hasError: true, errorCode: error?.response?.status || null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("error: ", error);
    console.log("errorInfo: ", errorInfo);
  }

  public render() {
    const Alert = ({ message }: { message: string }) => {
      return (
        <div className="flex flex-col gap-5 justify-center items-center w-full h-screen">
          <div role={"alert"}>{message}</div>
          <button
            onClick={() => {
              window.location.replace("/");
            }}
            className="btn btn-primary"
          >
            메인으로
          </button>
        </div>
      );
    };
    if (this.state.hasError) {
      const errorCode = this.state.errorCode;
      switch (errorCode) {
        case 401:
          return <Alert message={"권한이 없는 페이지입니다."} />;
        case 403:
          return <Alert message={"권한이 없는 페이지입니다."} />;
        case 404:
          return <Alert message={"존재하지 않는 페이지입니다."} />;
        default:
          return <Alert message={"오류가 발생했습니다."} />;
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
