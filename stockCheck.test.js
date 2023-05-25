const solution = require("./stockCheck");

test ('solution resolves or rejects correctly', () => {
    const a = solution(['fail']);
    const b = solution(['9999-1111-2222-3333']);
    const c = solution(['8888-1111-2222-3333']);
    const d = solution(['8888-1111-2222-3333', '9999-1111-2222-3333']);
    const e = solution(['9999-1111-2222-3333-4444', '8888-1111-2222-3333']);
    const f = solution(['8888-1111-2222-3333', '8888-2222-3333-4444']);
    const g = solution([]);
    expect(a).toEqual(['invalid-format', 'fail']);
    expect(b).toEqual('9999-1111-2222-3333', 'internal-server-error');
    expect(c).toEqual(['8888-1111-2222-3333']);
    expect(d).toEqual('9999-1111-2222-3333', 'internal-server-error');
    expect(e).toEqual(['invalid-format', '9999-1111-2222-3333-4444']);
    expect(f).toEqual(['8888-1111-2222-3333', '8888-2222-3333-4444']);
    expect(g).toEqual(['internal_system_error'])
});