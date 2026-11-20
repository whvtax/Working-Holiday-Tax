/** 18 Nov (pt and vi language reviews): the guard reads Brazilian Portuguese and the
 *  Vietnamese "bên mình" voice the way it reads English. Example sentences are the reviewers'. */
import { policyGuard } from '../policy-guard';

const ctx = {
  state: 'PRICE_SENT', paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
  lastCustomerMsgAt: new Date(),
} as unknown as Parameters<typeof policyGuard>[1];
const v = (t: string) => policyGuard(t, ctx).violations;

describe('Brazilian Portuguese', () => {
  it('a registered agent claim is refused', () => {
    expect(v('Somos um registered tax agent.')).toContain('AGENT_CLAIM');
    expect(v('A gente é um registered tax agent, pode ficar tranquilo.')).toContain('AGENT_CLAIM');
    expect(v('Nós somos contadores registrados.')).toContain('AGENT_CLAIM');
  });
  it('the approved supervision meaning passes', () => {
    expect(v('Claro. Operamos sob a supervisão de um registered tax agent.')).not.toContain('AGENT_CLAIM');
  });
  it('myGov steps and DIY are refused', () => {
    expect(v('Acesse o myGov, clique em Impostos e selecione Declaração.')).toContain('MYGOV_TROUBLESHOOTING');
    expect(v('Você mesmo pode enviar pelo myGov.')).toContain('DIY_INSTRUCTIONS');
  });
  it('a team time promise is refused', () => {
    expect(v('A equipe responde em breve.')).toContain('TEAM_TIME_PROMISE');
    expect(v('Vamos enviar sua declaração hoje mesmo.')).toContain('TEAM_TIME_PROMISE');
    expect(v('Em breve a equipe retorna para você.')).toContain('TEAM_TIME_PROMISE');
  });
  it('the approved wording is not touched', () => {
    expect(v('Agradeço! Vamos enviar o link de pagamento para você daqui a pouco.')).not.toContain('TEAM_TIME_PROMISE');
    expect(v('Passei isso para a equipe, e eles costumam responder aqui em até um dia útil.')).not.toContain('TEAM_TIME_PROMISE');
  });
});

describe('Vietnamese, in the "bên mình" voice', () => {
  it('an agent claim is refused', () => {
    expect(v('Bên mình là đại lý thuế.')).toContain('AGENT_CLAIM');
    expect(v('Bên mình là registered tax agent nên bạn yên tâm.')).toContain('AGENT_CLAIM');
  });
  it('a refund promise is refused, the approved guarantee is not', () => {
    expect(v('Bên mình sẽ hoàn lại phí cho bạn.')).toContain('REFUND_OR_CANCEL_PROMISE');
    expect(v('Nếu tiền hoàn thuế của bạn thấp hơn phí của bên mình, bên mình sẽ trả lại bạn phần chênh lệch.')).not.toContain('REFUND_OR_CANCEL_PROMISE');
  });
  it('"trợ lý ảo" is an AI mention', () => {
    expect(v('Mình là trợ lý ảo của bên mình.')).toContain('AI_MENTION');
  });
  it('the supervision meaning passes', () => {
    expect(v('Tất nhiên rồi. Bên mình hoạt động dưới sự giám sát của một registered tax agent.')).not.toContain('AGENT_CLAIM');
  });
});

describe('Chinese', () => {
  it('注册税务师 for us is refused', () => {
    const out = v('我们是注册税务师。');
    expect(out.some((x) => x === 'AGENT_CLAIM' || x === 'PROTECTED_AGENT_TITLE')).toBe(true);
  });
});
