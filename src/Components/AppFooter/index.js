import { Typography } from 'antd';

function AppFooter() {
  return (
    <div className="AppFooter">
      <Typography.Link href="tel:+21620910370">+216 20 910 370</Typography.Link>
      <Typography.Link href="https://www.google.com" target="_blank">
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target="_blank">
        Terms of Use
      </Typography.Link>
    </div>
  );
}
export default AppFooter;
