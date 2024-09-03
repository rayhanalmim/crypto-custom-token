import { TextInput } from '../../../../../partials/Elements/Forms/TextInput';

export function TransactionInput({
  amount,
  recipient,
  onAmountChange,
  onRecipientChange,
}) {
  return (
    <>
      <TextInput
        value={amount}
        placeholder={'Amount'}
        setState={onAmountChange}
      />
      <TextInput
        value={recipient}
        placeholder={'Recipient'}
        setState={onRecipientChange}
      />
    </>
  );
}
