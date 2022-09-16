module.exports = [ 1, 0, 0, [ [ "cc.EffectAsset", [ "_name", "shaders", "techniques" ], 0 ] ], [ [ 0, 0, 1, 2, 4 ] ], [ [ 0, "builtin-clear-stencil", [ {
    hash: 2075641479,
    record: null,
    name: "builtin-clear-stencil|vs|fs",
    glsl3: {
        vert: "\nprecision highp float;\nin vec3 a_position;\nvoid main () {\n  gl_Position = vec4(a_position, 1);\n}",
        frag: "\nprecision highp float;\nvoid main () {\n  gl_FragColor = vec4(1.0);\n}"
    },
    glsl1: {
        vert: "\nprecision highp float;\nattribute vec3 a_position;\nvoid main () {\n  gl_Position = vec4(a_position, 1);\n}",
        frag: "\nprecision highp float;\nvoid main () {\n  gl_FragColor = vec4(1.0);\n}"
    },
    builtins: {
        globals: {
            blocks: [],
            samplers: []
        },
        locals: {
            blocks: [],
            samplers: []
        }
    },
    defines: [],
    blocks: [],
    samplers: []
} ], [ {
    passes: [ {
        program: "builtin-clear-stencil|vs|fs",
        blendState: {
            targets: [ {
                blend: true
            } ]
        },
        rasterizerState: {
            cullMode: 0
        }
    } ]
} ] ] ], 0, 0, [], [], [] ];