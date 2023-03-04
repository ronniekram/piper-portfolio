import "twin.macro";
import Flag from "@web/src/common/flag";

const Home = () => {
  return (
    <div tw="w-screen h-screen bg-white-off flex items-center justify-center">
      <div tw="h-72 flex space-x-14">
        <Flag label="illustration" />
        <Flag label="branding" />
        <Flag label="app" />
        <Flag label="scale" />
      </div>
    </div>
  );
};

export default Home;
