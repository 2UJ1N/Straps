// ���� db�� ����Ʈ���� �Է��� �̸����� �ִ��� ã��
const user = await this.userModel.findByEmail(email);
if (!user) {
  throw new Error('�ش� �̸����� ���� ������ �����ϴ�. �ٽ� �� �� Ȯ���� �ּ���.');
}

// ��й�ȣ ��ġ ���� Ȯ��
const correctPasswordHash = user.password; // db�� ����Ǿ� �ִ� ��ȣȭ�� ��й�ȣ

// �Ű������� ���� �߿� (1��°�� ����Ʈ�� ������ ��й�ȣ, 2���� db�� �ֶ� ��ȣȭ�� ��й�ȣ)
const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

if (!isPasswordCorrect) {
  throw new Error('��й�ȣ�� ��ġ���� �ʽ��ϴ�. �ٽ� �� �� Ȯ���� �ּ���.');
}
