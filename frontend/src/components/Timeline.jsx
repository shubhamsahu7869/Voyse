import { Clock3, Lightbulb } from "lucide-react";
const segmentLabel = { morning: "Morning", afternoon: "Afternoon", evening: "Evening" };
export default function Timeline({ days }) {
  return <div className="timeline">{days.map(day => <article className="day" key={day.dayNumber}>
    <aside><b>DAY {String(day.dayNumber).padStart(2, "0")}</b><span>{day.date}</span></aside>
    <div className="day-body"><h3>{day.theme}</h3>
      {["morning", "afternoon", "evening"].map(period => <div className="event" key={period}><div className="event-time"><Clock3 size={14} />{day[period].time}</div><div><small>{segmentLabel[period]}</small><h4>{day[period].title}</h4><p>{day[period].description}</p></div></div>)}
      <div className="tips"><Lightbulb size={16} /><span>{day.tips[0]}</span></div>
    </div>
  </article>)}</div>;
}
