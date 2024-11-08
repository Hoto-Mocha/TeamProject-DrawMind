import Header from "./components/common/Header";

export default function Layout({children}) {
    return (
      <div>
          <Header />
          {children}
      </div>
    )
}