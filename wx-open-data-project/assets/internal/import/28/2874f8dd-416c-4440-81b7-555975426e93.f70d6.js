module.exports = [ 1, 0, 0, [ [ "cc.EffectAsset", [ "_name", "shaders", "techniques" ], 0 ] ], [ [ 0, 0, 1, 2, 4 ] ], [ [ 0, "builtin-2d-sprite", [ {
    hash: 2440430725,
    record: null,
    name: "builtin-2d-sprite|vs|fs",
    glsl3: {
        vert: "\nprecision highp float;\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nin vec3 a_position;\nin vec4 a_color;\nout vec4 v_color;\n#if USE_TEXTURE\nin vec2 a_uv0;\nout vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  #if CC_USE_MODEL\n  pos = cc_matViewProj * cc_matWorld * pos;\n  #else\n  pos = cc_matViewProj * pos;\n  #endif\n  #if USE_TEXTURE\n  v_uv0 = a_uv0;\n  #endif\n  v_color = a_color;\n  gl_Position = pos;\n}",
        frag: "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform ALPHA_TEST {\n    float alphaThreshold;\n  };\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nin vec4 v_color;\n#if USE_TEXTURE\nin vec2 v_uv0;\nuniform sampler2D texture;\n#endif\nvoid main () {\n  vec4 o = vec4(1, 1, 1, 1);\n  #if USE_TEXTURE\n  vec4 texture_tmp = texture(texture, v_uv0);\n  #if CC_USE_ALPHA_ATLAS_texture\n      texture_tmp.a *= texture(texture, v_uv0 + vec2(0, 0.5)).r;\n  #endif\n  #if INPUT_IS_GAMMA\n    o.rgb *= (texture_tmp.rgb * texture_tmp.rgb);\n    o.a *= texture_tmp.a;\n  #else\n    o *= texture_tmp;\n  #endif\n  #endif\n  o *= v_color;\n  ALPHA_TEST(o);\n  #if USE_BGRA\n    gl_FragColor = o.bgra;\n  #else\n    gl_FragColor = o.rgba;\n  #endif\n}"
    },
    glsl1: {
        vert: "\nprecision highp float;\nuniform mat4 cc_matViewProj;\nuniform mat4 cc_matWorld;\nattribute vec3 a_position;\nattribute vec4 a_color;\nvarying vec4 v_color;\n#if USE_TEXTURE\nattribute vec2 a_uv0;\nvarying vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  #if CC_USE_MODEL\n  pos = cc_matViewProj * cc_matWorld * pos;\n  #else\n  pos = cc_matViewProj * pos;\n  #endif\n  #if USE_TEXTURE\n  v_uv0 = a_uv0;\n  #endif\n  v_color = a_color;\n  gl_Position = pos;\n}",
        frag: "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform float alphaThreshold;\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nvarying vec4 v_color;\n#if USE_TEXTURE\nvarying vec2 v_uv0;\nuniform sampler2D texture;\n#endif\nvoid main () {\n  vec4 o = vec4(1, 1, 1, 1);\n  #if USE_TEXTURE\n  vec4 texture_tmp = texture2D(texture, v_uv0);\n  #if CC_USE_ALPHA_ATLAS_texture\n      texture_tmp.a *= texture2D(texture, v_uv0 + vec2(0, 0.5)).r;\n  #endif\n  #if INPUT_IS_GAMMA\n    o.rgb *= (texture_tmp.rgb * texture_tmp.rgb);\n    o.a *= texture_tmp.a;\n  #else\n    o *= texture_tmp;\n  #endif\n  #endif\n  o *= v_color;\n  ALPHA_TEST(o);\n  #if USE_BGRA\n    gl_FragColor = o.bgra;\n  #else\n    gl_FragColor = o.rgba;\n  #endif\n}"
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
        name: "USE_TEXTURE",
        type: "boolean",
        defines: []
    }, {
        name: "CC_USE_MODEL",
        type: "boolean",
        defines: []
    }, {
        name: "USE_ALPHA_TEST",
        type: "boolean",
        defines: []
    }, {
        name: "CC_USE_ALPHA_ATLAS_texture",
        type: "boolean",
        defines: [ "USE_TEXTURE" ]
    }, {
        name: "INPUT_IS_GAMMA",
        type: "boolean",
        defines: [ "USE_TEXTURE" ]
    }, {
        name: "USE_BGRA",
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
    samplers: [ {
        name: "texture",
        type: 29,
        count: 1,
        binding: 30,
        defines: [ "USE_TEXTURE" ]
    } ]
} ], [ {
    passes: [ {
        program: "builtin-2d-sprite|vs|fs",
        blendState: {
            targets: [ {
                blend: true
            } ]
        },
        rasterizerState: {
            cullMode: 0
        },
        properties: {
            texture: {
                value: "white",
                type: 29
            },
            alphaThreshold: {
                type: 13,
                value: [ .5 ]
            }
        }
    } ]
} ] ] ], 0, 0, [], [], [] ];