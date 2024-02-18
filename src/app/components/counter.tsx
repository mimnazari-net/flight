import { useSelector } from "react-redux";
import "../styles/counter.css";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { adult } from "../redux/flightSlice";
interface passenger {
  label: string;
  count: number;
  type: string;
}

export default function Counter({ label, count, type }: passenger) {
  const select = useSelector((state: RootState) => state.flightSlice);
  const dispatch = useDispatch();
  return (
    <div className="Counter_container">
      <div className="Counter_left">
        <p>{label}</p>
        <span>{label}</span>
      </div>
      <div className="Counter_right">
        <button
          onClick={() => dispatch(adult({ fun: "-", type: type }))}
          disabled={
            (count === 1 && type === "adult") ||
            (count === 0 && type !== "adult")
          }
          style={{
            backgroundColor:
              (count === 1 && type === "adult") ||
              (count === 0 && type !== "adult")
                ? "#545f5e"
                : "#009688",
          }}
        >
          -
        </button>
        <div className="Counter_count" >{count}</div>
        <button onClick={() => dispatch(adult({ fun: "+", type: type }))}>
          +
        </button>
      </div>
    </div>
  );
}
