export default function CampanyInfo({ company }) {
  const { name, catchPhrase, bs } = company;
  return (
    <div>
      <div>회사명: {name}</div>
      <div>슬로건: {catchPhrase}</div>
      <div>비즈니스 서비스: {bs}</div>
    </div>
  );
}
