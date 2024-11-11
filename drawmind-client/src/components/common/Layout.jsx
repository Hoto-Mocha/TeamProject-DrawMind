import Header from "./Header";

export default function Layout({children}) {
    return (
      <div className="screen">
          <Header />
          {children}
      </div>
    )
}