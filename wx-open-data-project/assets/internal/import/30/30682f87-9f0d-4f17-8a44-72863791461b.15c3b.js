module.exports = [ 1, 0, 0, [ [ "cc.EffectAsset", [ "_name", "shaders", "techniques" ], 0 ] ], [ [ 0, 0, 1, 2, 4 ] ], [ [ 0, "builtin-2d-graphics", [ {
    hash: 550349795,
    record: null,
    name: "builtin-2d-graphics|vs|fs",
    glsl3: {
        vert: "\nprecision highp float;\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nin vec3 a_position;\nin vec4 a_color;\nout vec4 v_color;\nin float a_dist;\nout float v_dist;\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  pos = cc_matViewProj * cc_matWorld * pos;\n  v_color = a_color;\n  v_dist = a_dist;\n  gl_Position = pos;\n}",
        frag: "\n#if CC_SUPPORT_standard_derivatives\n  #extension GL_OES_standard_derivatives : enable\n#endif\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform ALPHA_TEST {\n    float alphaThreshold;\n  };\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nin vec4 v_color;\nin float v_dist;\nvoid main () {\n  vec4 o = v_color;\n  ALPHA_TEST(o);\n  #if CC_SUPPORT_standard_derivatives\n    float aa = fwidth(v_dist);\n  #else\n    float aa = 0.05;\n  #endif\n  float alpha = 1. - smoothstep(-aa, 0., abs(v_dist) - 1.0);\n  o.rgb *= o.a;\n  o *= alpha;\n  gl_FragColor = o;\n}"
    },
    glsl1: {
        vert: "\nprecision highp float;\nuniform mat4 cc_matViewProj;\nuniform mat4 cc_matWorld;\nattribute vec3 a_position;\nattribute vec4 a_color;\nvarying vec4 v_color;\nattribute float a_dist;\nvarying float v_dist;\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  pos = cc_matViewProj * cc_matWorld * pos;\n  v_color = a_color;\n  v_dist = a_dist;\n  gl_Position = pos;\n}",
        frag: "\n#if CC_SUPPORT_standard_derivatives\n  #extension GL_OES_standard_derivatives : enable\n#endif\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform float alphaThreshold;\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nvarying vec4 v_color;\nvarying float v_dist;\nvoid main () {\n  vec4 o = v_color;\n  ALPHA_TEST(o);\n  #if CC_SUPPORT_standard_derivatives\n    float aa = fwidth(v_dist);\n  #else\n    float aa = 0.05;\n  #endif\n  float alpha = 1. - smoothstep(-aa, 0., abs(v_dist) - 1.0);\n  o.rgb *= o.a;\n  o *= alpha;\n  gl_FragColor = o;\n}"
    },
    builtins: {
        globals: {
            blocks: [ {
                name: "CCGlobal",
                defines: []
            } ],
            samplers: []
        },
        locals: {
            blocks: [ {
                name: "CCLocal",
                defines: []
            } ],
            samplers: []
        }
    },
    defines: [ {
        name: "CC_SUPPORT_standard_derivatives",
        type: "boolean",
        defines: []
    }, {
        name: "USE_ALPHA_TEST",
        type: "boolean",
        defines: []
    } ],
    blocks: [ {
        name: "ALPHA_TEST",
        binding: 0,
        members: [ {
            name: "alphaThreshold",
            type: 13,
            count: 1
        } ],
        defines: [ "USE_ALPHA_TEST" ]
    } ],
    samplers: []
} ], [ {
    passes: [ {
        program: "builtin-2d-graphics|vs|fs",
        blendState: {
            targets: [ {
                blend: true,
                blendSrc: 1,
                blendDst: 771,
                blendSrcAlpha: 1,
                blendDstAlpha: 771
            } ]
        },
        rasterizerState: {
            cullMode: 0
        },
        properties: {
            alphaThreshold: {
                type: 13,
                value: [ .5 ]
            }
        }
    } ]
} ] ] ], 0, 0, [], [], [] ];