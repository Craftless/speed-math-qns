import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import StatDisplay from "../components/StatDisplay";
import { projectFirestore } from "../firebase/config";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  setGlobalTGP,
  setPersonalTGP,
  setTotalCorrect,
  setTotalScore,
  setTotalSkipped,
  setTotalUsers as setTU,
  setTotalWrong,
} from "../store/redux/stats-slice";
import classes from "./HomePage.module.css";

function HomePage() {
  const [totalUsers, setTotalUsers] = useState(NaN as number);
  const [globalTotalGamesPlayed, setGlobalTotalGamesPlayed] = useState(
    NaN as number
  );
  const [personalTotalGamesPlayed, setPersonalTotalGamesPlayed] = useState(
    NaN as number
  );
  const [personalTotalScore, setPersonalTotalScore] = useState(NaN as number);
  const [personalTotalCorrect, setPersonalTotalCorrect] = useState(
    NaN as number
  );
  const [personalTotalWrong, setPersonalTotalWrong] = useState(NaN as number);
  const [personalTotalSkipped, setPersonalTotalSkipped] = useState(
    NaN as number
  );
  const stats = useAppSelector((store) => store.stats);
  const dispatch = useAppDispatch();
  const { user } = useAuthContext();

  // TODO Refactor to make code less repetitive

  useEffect(() => {
    if (stats.hasData) {
      setTotalUsers(stats.totalUsers!);
      setPersonalTotalScore(stats.totalScore!);
      setPersonalTotalGamesPlayed(stats.personalTGP!);
      setGlobalTotalGamesPlayed(stats.globalTGP!);
      setPersonalTotalCorrect(stats.totalCorrect!);
      setPersonalTotalWrong(stats.totalWrong!);
      setPersonalTotalSkipped(stats.totalSkipped!);
    } else {
      (async () => {
        try {
          const globalStats = (
            await projectFirestore
              .collection("stats")
              .doc("homePageStats")
              .get()
          ).data();
          const personalStats = (
            await projectFirestore.collection("userData").doc(user!.uid).get()
          ).data();
          console.log(globalStats);
          console.log(personalStats);
          const tu: number = globalStats!.totalUsers;
          const tgp: number = globalStats!.totalGamesPlayed;
          const personalTgp: number = personalStats!.totalGamesPlayed;
          const personalTotalScore: number = personalStats!.totalScore;
          const personalTotalCorrect: number = personalStats!.totalCorrect;
          const personalTotalWrong: number = personalStats!.totalWrong;
          const personalTotalSkipped: number = personalStats!.totalSkipped;
          setTotalUsers(tu);
          setGlobalTotalGamesPlayed(tgp);
          setPersonalTotalGamesPlayed(personalTgp);
          setPersonalTotalScore(personalTotalScore);
          setPersonalTotalCorrect(personalTotalCorrect);
          setPersonalTotalWrong(personalTotalWrong);
          setPersonalTotalSkipped(personalTotalSkipped);
          dispatch(setTU({ totalUsers: tu }));
          dispatch(setGlobalTGP({ globalTGP: tgp }));
          dispatch(setPersonalTGP({ personalTGP: personalTgp }));
          dispatch(setTotalScore({ totalScore: personalTotalScore }));
          dispatch(setTotalCorrect({ totalCorrect: personalTotalCorrect }));
          dispatch(setTotalWrong({ totalWrong: personalTotalWrong }));
          dispatch(setTotalSkipped({ totalSkipped: personalTotalSkipped }));
        } catch (e) {
          alert(e);
        }
      })();
    }
  }, [dispatch, stats.totalUsers]);

  return (
    <div className={classes.outerContainer}>
      <div className={classes.statsOuterContainer}>
        <div className={classes.statsTextContainer}>
          <h2>Statistics</h2>
        </div>
        <div className={classes.statsTable}>
          <StatDisplay
            value={globalTotalGamesPlayed}
            label="Total Games Played"
          />
          <StatDisplay value={totalUsers} label="Total Users" />
          <StatDisplay value={personalTotalScore} label="Your Total Score" />
          <StatDisplay
            value={personalTotalGamesPlayed}
            label="Your Total Games Played"
          />
          <StatDisplay
            value={personalTotalCorrect}
            label="Your Total Questions Correct"
          />
          <StatDisplay
            value={personalTotalWrong}
            label="Your Total Questions Wrong"
          />
          <StatDisplay
            value={personalTotalSkipped}
            label="Your Total Questions Skipped"
          />
        </div>
      </div>
      {/* <div className={classes.miniLeaderboard}>
        <h2>Top 5</h2>
      </div> */}

      <div className={classes.hintTextContainer}>
        <p>To refresh the statistics, reload the page.</p>
      </div>
    </div>
  );
}

export default HomePage;
