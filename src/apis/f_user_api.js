// 유저 db에 프론트에서 입력한 이메일이 있는지 찾기
const user = await this.userModel.findByEmail(email);
if (!user) {
  throw new Error('�ش� �̸����� ���� ������ �����ϴ�. �ٽ� �� �� Ȯ���� �ּ���.');
}

// 비밀번호 일치 여부 확인
const correctPasswordHash = user.password; // // db에 저장되어 있는 암호화된 비밀번호

// 매개변수의 순서 중요 (1번째는 프론트가 보내온 비밀번호, 2번는 db에 있떤 암호화된 비밀번호)
const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

if (!isPasswordCorrect) {
  throw new Error('��й�ȣ�� ��ġ���� �ʽ��ϴ�. �ٽ� �� �� Ȯ���� �ּ���.');
}
