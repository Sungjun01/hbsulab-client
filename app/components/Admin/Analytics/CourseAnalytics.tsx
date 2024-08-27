import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
  ScatterChart,
  Scatter,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

type Props = {};

// Define a custom scatter plot shape with a border
const CustomScatterShape = (props: any) => {
  const { cx, cy, fill, stroke, payload, value } = props;

  // Define the border size and color based on the level
  const borderColor =
    payload.level === 1 ? "blue" : payload.level === 2 ? "green" : "red";
  const borderWidth = 2; // Border width

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={fill}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
    </g>
  );
};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});
  const analyticsData: any = [];
  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });
  const minValue = 0;

  // Data for Student Learning Progress
  const sampleUserData = [
    { course: "Biology", level: 1, users: 3 },
    { course: "Biology", level: 2, users: 2 },
    { course: "Biology", level: 3, users: 2 },
    { course: "Machine Learning", level: 1, users: 3 },
    { course: "Machine Learning", level: 2, users: 2 },
    { course: "Machine Learning", level: 3, users: 2 },
  ];

  // Generate scattered user points with random x and y within the level
  const scatterData = sampleUserData.flatMap(({ course, level, users }) =>
    Array.from({ length: users }, (_, i) => ({
      course,
      level,
      x: level + (Math.random() - 0.5) * 0.8, // Scatter x-axis within each level
      y: (course === "Biology" ? 1 : 2) + (Math.random() - 0.5) * 0.5, // Scatter y-axis within each course
      user: `User ${i + 1}`, // User identification
    }))
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Courses Analytics
            </h1>
            <p className={`${styles.label} px-5`}>
              Last 12 months analytics data{" "}
            </p>
          </div>
          <div className="w-full h-[90%] flex flex-col items-center justify-center">
            <ResponsiveContainer width="90%" height="40%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideTop" value="Month" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Student Learning Progress Scatter Plot */}
            <div className="mt-[50px] w-full">
              <h2 className={`${styles.title} px-5 !text-start`}>
                Student Learning Progress
              </h2>
              <ResponsiveContainer width="90%" height={400}>
                <ScatterChart
                  margin={{ top: 60, right: 20, bottom: 20, left: 100 }} // Increase top margin to fit the X-axis header
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    domain={[0, 3]}
                    ticks={[1, 2, 3, 4]}
                    label={{
                      value: "Level",
                      position: "insideTop",
                      offset: -10,
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    domain={[0.5, 2.5]}
                    ticks={[1, 2]}
                    tickFormatter={(value) =>
                      value === 1 ? "Biology" : "Machine Learning"
                    }
                    label={{
                      value: "Course",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(value, name, props) => [
                      `User: ${props.payload.user}`,
                      `Level: ${Math.round(props.payload.x)}`,
                      `Course: ${props.payload.course}`,
                    ]}
                  />
                  <Scatter
                    name="Students"
                    data={scatterData}
                    shape={<CustomScatterShape />}
                  />
                  {/* Line between Biology and Machine Learning */}
                  <Line
                    type="linear"
                    x1={0.5} // Adjust based on chart scale
                    y1={1} // Position at "Biology"
                    x2={3.5} // Adjust based on chart scale
                    y2={2} // Position at "Machine Learning"
                    stroke="#ff0000"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
