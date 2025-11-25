import Tabs from "./components/Tabs";

const tabsData = [
  {
    label: "Profile",
    content: <div>Profile info content</div>,
  },
  {
    label: "Dashboard",
    content: <div>Dashboard info content</div>,
  },
  {
    label: "Settings",
    content: <div>Settings info content</div>,
  },
  {
    label: "Invoice",
    content: <div>Invoice info content</div>,
  },
];

export default function App() {
  return (
    <div>
      <Tabs tabsData={tabsData} />
    </div>
  );
}
