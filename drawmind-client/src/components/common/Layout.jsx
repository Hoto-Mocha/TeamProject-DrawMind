import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="screen">
      <Header />
      <div style={{flex: 1}}>
        {children}
      </div>
    </div>
  )
}