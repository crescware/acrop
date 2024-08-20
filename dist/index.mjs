#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@babel/types/lib/utils/shallowEqual.js
var require_shallowEqual = __commonJS({
  "node_modules/@babel/types/lib/utils/shallowEqual.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = shallowEqual;
    function shallowEqual(actual, expected) {
      const keys = Object.keys(expected);
      for (const key of keys) {
        if (actual[key] !== expected[key]) {
          return false;
        }
      }
      return true;
    }
  }
});

// node_modules/@babel/types/lib/utils/deprecationWarning.js
var require_deprecationWarning = __commonJS({
  "node_modules/@babel/types/lib/utils/deprecationWarning.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = deprecationWarning;
    var warnings = /* @__PURE__ */ new Set();
    function deprecationWarning(oldName, newName, prefix = "") {
      if (warnings.has(oldName)) return;
      warnings.add(oldName);
      const {
        internal,
        trace
      } = captureShortStackTrace(1, 2);
      if (internal) {
        return;
      }
      console.warn(`${prefix}\`${oldName}\` has been deprecated, please migrate to \`${newName}\`
${trace}`);
    }
    function captureShortStackTrace(skip, length) {
      const {
        stackTraceLimit,
        prepareStackTrace
      } = Error;
      let stackTrace;
      Error.stackTraceLimit = 1 + skip + length;
      Error.prepareStackTrace = function(err, stack) {
        stackTrace = stack;
      };
      new Error().stack;
      Error.stackTraceLimit = stackTraceLimit;
      Error.prepareStackTrace = prepareStackTrace;
      if (!stackTrace) return {
        internal: false,
        trace: ""
      };
      const shortStackTrace = stackTrace.slice(1 + skip, 1 + skip + length);
      return {
        internal: /[\\/]@babel[\\/]/.test(shortStackTrace[1].getFileName()),
        trace: shortStackTrace.map((frame) => `    at ${frame}`).join("\n")
      };
    }
  }
});

// node_modules/@babel/types/lib/validators/generated/index.js
var require_generated = __commonJS({
  "node_modules/@babel/types/lib/validators/generated/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isAccessor = isAccessor;
    exports.isAnyTypeAnnotation = isAnyTypeAnnotation;
    exports.isArgumentPlaceholder = isArgumentPlaceholder;
    exports.isArrayExpression = isArrayExpression;
    exports.isArrayPattern = isArrayPattern;
    exports.isArrayTypeAnnotation = isArrayTypeAnnotation;
    exports.isArrowFunctionExpression = isArrowFunctionExpression;
    exports.isAssignmentExpression = isAssignmentExpression;
    exports.isAssignmentPattern = isAssignmentPattern;
    exports.isAwaitExpression = isAwaitExpression;
    exports.isBigIntLiteral = isBigIntLiteral;
    exports.isBinary = isBinary;
    exports.isBinaryExpression = isBinaryExpression;
    exports.isBindExpression = isBindExpression;
    exports.isBlock = isBlock;
    exports.isBlockParent = isBlockParent;
    exports.isBlockStatement = isBlockStatement;
    exports.isBooleanLiteral = isBooleanLiteral;
    exports.isBooleanLiteralTypeAnnotation = isBooleanLiteralTypeAnnotation;
    exports.isBooleanTypeAnnotation = isBooleanTypeAnnotation;
    exports.isBreakStatement = isBreakStatement;
    exports.isCallExpression = isCallExpression;
    exports.isCatchClause = isCatchClause;
    exports.isClass = isClass;
    exports.isClassAccessorProperty = isClassAccessorProperty;
    exports.isClassBody = isClassBody;
    exports.isClassDeclaration = isClassDeclaration;
    exports.isClassExpression = isClassExpression;
    exports.isClassImplements = isClassImplements;
    exports.isClassMethod = isClassMethod;
    exports.isClassPrivateMethod = isClassPrivateMethod;
    exports.isClassPrivateProperty = isClassPrivateProperty;
    exports.isClassProperty = isClassProperty;
    exports.isCompletionStatement = isCompletionStatement;
    exports.isConditional = isConditional;
    exports.isConditionalExpression = isConditionalExpression;
    exports.isContinueStatement = isContinueStatement;
    exports.isDebuggerStatement = isDebuggerStatement;
    exports.isDecimalLiteral = isDecimalLiteral;
    exports.isDeclaration = isDeclaration;
    exports.isDeclareClass = isDeclareClass;
    exports.isDeclareExportAllDeclaration = isDeclareExportAllDeclaration;
    exports.isDeclareExportDeclaration = isDeclareExportDeclaration;
    exports.isDeclareFunction = isDeclareFunction;
    exports.isDeclareInterface = isDeclareInterface;
    exports.isDeclareModule = isDeclareModule;
    exports.isDeclareModuleExports = isDeclareModuleExports;
    exports.isDeclareOpaqueType = isDeclareOpaqueType;
    exports.isDeclareTypeAlias = isDeclareTypeAlias;
    exports.isDeclareVariable = isDeclareVariable;
    exports.isDeclaredPredicate = isDeclaredPredicate;
    exports.isDecorator = isDecorator;
    exports.isDirective = isDirective;
    exports.isDirectiveLiteral = isDirectiveLiteral;
    exports.isDoExpression = isDoExpression;
    exports.isDoWhileStatement = isDoWhileStatement;
    exports.isEmptyStatement = isEmptyStatement;
    exports.isEmptyTypeAnnotation = isEmptyTypeAnnotation;
    exports.isEnumBody = isEnumBody;
    exports.isEnumBooleanBody = isEnumBooleanBody;
    exports.isEnumBooleanMember = isEnumBooleanMember;
    exports.isEnumDeclaration = isEnumDeclaration;
    exports.isEnumDefaultedMember = isEnumDefaultedMember;
    exports.isEnumMember = isEnumMember;
    exports.isEnumNumberBody = isEnumNumberBody;
    exports.isEnumNumberMember = isEnumNumberMember;
    exports.isEnumStringBody = isEnumStringBody;
    exports.isEnumStringMember = isEnumStringMember;
    exports.isEnumSymbolBody = isEnumSymbolBody;
    exports.isExistsTypeAnnotation = isExistsTypeAnnotation;
    exports.isExportAllDeclaration = isExportAllDeclaration;
    exports.isExportDeclaration = isExportDeclaration;
    exports.isExportDefaultDeclaration = isExportDefaultDeclaration;
    exports.isExportDefaultSpecifier = isExportDefaultSpecifier;
    exports.isExportNamedDeclaration = isExportNamedDeclaration;
    exports.isExportNamespaceSpecifier = isExportNamespaceSpecifier;
    exports.isExportSpecifier = isExportSpecifier;
    exports.isExpression = isExpression;
    exports.isExpressionStatement = isExpressionStatement;
    exports.isExpressionWrapper = isExpressionWrapper;
    exports.isFile = isFile;
    exports.isFlow = isFlow;
    exports.isFlowBaseAnnotation = isFlowBaseAnnotation;
    exports.isFlowDeclaration = isFlowDeclaration;
    exports.isFlowPredicate = isFlowPredicate;
    exports.isFlowType = isFlowType;
    exports.isFor = isFor;
    exports.isForInStatement = isForInStatement;
    exports.isForOfStatement = isForOfStatement;
    exports.isForStatement = isForStatement;
    exports.isForXStatement = isForXStatement;
    exports.isFunction = isFunction;
    exports.isFunctionDeclaration = isFunctionDeclaration;
    exports.isFunctionExpression = isFunctionExpression;
    exports.isFunctionParent = isFunctionParent;
    exports.isFunctionTypeAnnotation = isFunctionTypeAnnotation;
    exports.isFunctionTypeParam = isFunctionTypeParam;
    exports.isGenericTypeAnnotation = isGenericTypeAnnotation;
    exports.isIdentifier = isIdentifier;
    exports.isIfStatement = isIfStatement;
    exports.isImmutable = isImmutable;
    exports.isImport = isImport;
    exports.isImportAttribute = isImportAttribute;
    exports.isImportDeclaration = isImportDeclaration2;
    exports.isImportDefaultSpecifier = isImportDefaultSpecifier;
    exports.isImportExpression = isImportExpression;
    exports.isImportNamespaceSpecifier = isImportNamespaceSpecifier;
    exports.isImportOrExportDeclaration = isImportOrExportDeclaration;
    exports.isImportSpecifier = isImportSpecifier;
    exports.isIndexedAccessType = isIndexedAccessType;
    exports.isInferredPredicate = isInferredPredicate;
    exports.isInterfaceDeclaration = isInterfaceDeclaration;
    exports.isInterfaceExtends = isInterfaceExtends;
    exports.isInterfaceTypeAnnotation = isInterfaceTypeAnnotation;
    exports.isInterpreterDirective = isInterpreterDirective;
    exports.isIntersectionTypeAnnotation = isIntersectionTypeAnnotation;
    exports.isJSX = isJSX;
    exports.isJSXAttribute = isJSXAttribute;
    exports.isJSXClosingElement = isJSXClosingElement;
    exports.isJSXClosingFragment = isJSXClosingFragment;
    exports.isJSXElement = isJSXElement;
    exports.isJSXEmptyExpression = isJSXEmptyExpression;
    exports.isJSXExpressionContainer = isJSXExpressionContainer;
    exports.isJSXFragment = isJSXFragment;
    exports.isJSXIdentifier = isJSXIdentifier;
    exports.isJSXMemberExpression = isJSXMemberExpression;
    exports.isJSXNamespacedName = isJSXNamespacedName;
    exports.isJSXOpeningElement = isJSXOpeningElement;
    exports.isJSXOpeningFragment = isJSXOpeningFragment;
    exports.isJSXSpreadAttribute = isJSXSpreadAttribute;
    exports.isJSXSpreadChild = isJSXSpreadChild;
    exports.isJSXText = isJSXText;
    exports.isLVal = isLVal;
    exports.isLabeledStatement = isLabeledStatement;
    exports.isLiteral = isLiteral;
    exports.isLogicalExpression = isLogicalExpression;
    exports.isLoop = isLoop;
    exports.isMemberExpression = isMemberExpression;
    exports.isMetaProperty = isMetaProperty;
    exports.isMethod = isMethod;
    exports.isMiscellaneous = isMiscellaneous;
    exports.isMixedTypeAnnotation = isMixedTypeAnnotation;
    exports.isModuleDeclaration = isModuleDeclaration;
    exports.isModuleExpression = isModuleExpression;
    exports.isModuleSpecifier = isModuleSpecifier;
    exports.isNewExpression = isNewExpression;
    exports.isNoop = isNoop;
    exports.isNullLiteral = isNullLiteral;
    exports.isNullLiteralTypeAnnotation = isNullLiteralTypeAnnotation;
    exports.isNullableTypeAnnotation = isNullableTypeAnnotation;
    exports.isNumberLiteral = isNumberLiteral;
    exports.isNumberLiteralTypeAnnotation = isNumberLiteralTypeAnnotation;
    exports.isNumberTypeAnnotation = isNumberTypeAnnotation;
    exports.isNumericLiteral = isNumericLiteral;
    exports.isObjectExpression = isObjectExpression;
    exports.isObjectMember = isObjectMember;
    exports.isObjectMethod = isObjectMethod;
    exports.isObjectPattern = isObjectPattern;
    exports.isObjectProperty = isObjectProperty;
    exports.isObjectTypeAnnotation = isObjectTypeAnnotation;
    exports.isObjectTypeCallProperty = isObjectTypeCallProperty;
    exports.isObjectTypeIndexer = isObjectTypeIndexer;
    exports.isObjectTypeInternalSlot = isObjectTypeInternalSlot;
    exports.isObjectTypeProperty = isObjectTypeProperty;
    exports.isObjectTypeSpreadProperty = isObjectTypeSpreadProperty;
    exports.isOpaqueType = isOpaqueType;
    exports.isOptionalCallExpression = isOptionalCallExpression;
    exports.isOptionalIndexedAccessType = isOptionalIndexedAccessType;
    exports.isOptionalMemberExpression = isOptionalMemberExpression;
    exports.isParenthesizedExpression = isParenthesizedExpression;
    exports.isPattern = isPattern;
    exports.isPatternLike = isPatternLike;
    exports.isPipelineBareFunction = isPipelineBareFunction;
    exports.isPipelinePrimaryTopicReference = isPipelinePrimaryTopicReference;
    exports.isPipelineTopicExpression = isPipelineTopicExpression;
    exports.isPlaceholder = isPlaceholder;
    exports.isPrivate = isPrivate;
    exports.isPrivateName = isPrivateName;
    exports.isProgram = isProgram;
    exports.isProperty = isProperty;
    exports.isPureish = isPureish;
    exports.isQualifiedTypeIdentifier = isQualifiedTypeIdentifier;
    exports.isRecordExpression = isRecordExpression;
    exports.isRegExpLiteral = isRegExpLiteral;
    exports.isRegexLiteral = isRegexLiteral;
    exports.isRestElement = isRestElement;
    exports.isRestProperty = isRestProperty;
    exports.isReturnStatement = isReturnStatement;
    exports.isScopable = isScopable;
    exports.isSequenceExpression = isSequenceExpression;
    exports.isSpreadElement = isSpreadElement;
    exports.isSpreadProperty = isSpreadProperty;
    exports.isStandardized = isStandardized;
    exports.isStatement = isStatement;
    exports.isStaticBlock = isStaticBlock;
    exports.isStringLiteral = isStringLiteral;
    exports.isStringLiteralTypeAnnotation = isStringLiteralTypeAnnotation;
    exports.isStringTypeAnnotation = isStringTypeAnnotation;
    exports.isSuper = isSuper;
    exports.isSwitchCase = isSwitchCase;
    exports.isSwitchStatement = isSwitchStatement;
    exports.isSymbolTypeAnnotation = isSymbolTypeAnnotation;
    exports.isTSAnyKeyword = isTSAnyKeyword;
    exports.isTSArrayType = isTSArrayType;
    exports.isTSAsExpression = isTSAsExpression;
    exports.isTSBaseType = isTSBaseType;
    exports.isTSBigIntKeyword = isTSBigIntKeyword;
    exports.isTSBooleanKeyword = isTSBooleanKeyword;
    exports.isTSCallSignatureDeclaration = isTSCallSignatureDeclaration;
    exports.isTSConditionalType = isTSConditionalType;
    exports.isTSConstructSignatureDeclaration = isTSConstructSignatureDeclaration;
    exports.isTSConstructorType = isTSConstructorType;
    exports.isTSDeclareFunction = isTSDeclareFunction;
    exports.isTSDeclareMethod = isTSDeclareMethod;
    exports.isTSEntityName = isTSEntityName;
    exports.isTSEnumDeclaration = isTSEnumDeclaration;
    exports.isTSEnumMember = isTSEnumMember;
    exports.isTSExportAssignment = isTSExportAssignment;
    exports.isTSExpressionWithTypeArguments = isTSExpressionWithTypeArguments;
    exports.isTSExternalModuleReference = isTSExternalModuleReference;
    exports.isTSFunctionType = isTSFunctionType;
    exports.isTSImportEqualsDeclaration = isTSImportEqualsDeclaration;
    exports.isTSImportType = isTSImportType;
    exports.isTSIndexSignature = isTSIndexSignature;
    exports.isTSIndexedAccessType = isTSIndexedAccessType;
    exports.isTSInferType = isTSInferType;
    exports.isTSInstantiationExpression = isTSInstantiationExpression;
    exports.isTSInterfaceBody = isTSInterfaceBody;
    exports.isTSInterfaceDeclaration = isTSInterfaceDeclaration;
    exports.isTSIntersectionType = isTSIntersectionType;
    exports.isTSIntrinsicKeyword = isTSIntrinsicKeyword;
    exports.isTSLiteralType = isTSLiteralType;
    exports.isTSMappedType = isTSMappedType;
    exports.isTSMethodSignature = isTSMethodSignature;
    exports.isTSModuleBlock = isTSModuleBlock;
    exports.isTSModuleDeclaration = isTSModuleDeclaration;
    exports.isTSNamedTupleMember = isTSNamedTupleMember;
    exports.isTSNamespaceExportDeclaration = isTSNamespaceExportDeclaration;
    exports.isTSNeverKeyword = isTSNeverKeyword;
    exports.isTSNonNullExpression = isTSNonNullExpression;
    exports.isTSNullKeyword = isTSNullKeyword;
    exports.isTSNumberKeyword = isTSNumberKeyword;
    exports.isTSObjectKeyword = isTSObjectKeyword;
    exports.isTSOptionalType = isTSOptionalType;
    exports.isTSParameterProperty = isTSParameterProperty;
    exports.isTSParenthesizedType = isTSParenthesizedType;
    exports.isTSPropertySignature = isTSPropertySignature;
    exports.isTSQualifiedName = isTSQualifiedName;
    exports.isTSRestType = isTSRestType;
    exports.isTSSatisfiesExpression = isTSSatisfiesExpression;
    exports.isTSStringKeyword = isTSStringKeyword;
    exports.isTSSymbolKeyword = isTSSymbolKeyword;
    exports.isTSThisType = isTSThisType;
    exports.isTSTupleType = isTSTupleType;
    exports.isTSType = isTSType;
    exports.isTSTypeAliasDeclaration = isTSTypeAliasDeclaration;
    exports.isTSTypeAnnotation = isTSTypeAnnotation;
    exports.isTSTypeAssertion = isTSTypeAssertion;
    exports.isTSTypeElement = isTSTypeElement;
    exports.isTSTypeLiteral = isTSTypeLiteral;
    exports.isTSTypeOperator = isTSTypeOperator;
    exports.isTSTypeParameter = isTSTypeParameter;
    exports.isTSTypeParameterDeclaration = isTSTypeParameterDeclaration;
    exports.isTSTypeParameterInstantiation = isTSTypeParameterInstantiation;
    exports.isTSTypePredicate = isTSTypePredicate;
    exports.isTSTypeQuery = isTSTypeQuery;
    exports.isTSTypeReference = isTSTypeReference;
    exports.isTSUndefinedKeyword = isTSUndefinedKeyword;
    exports.isTSUnionType = isTSUnionType;
    exports.isTSUnknownKeyword = isTSUnknownKeyword;
    exports.isTSVoidKeyword = isTSVoidKeyword;
    exports.isTaggedTemplateExpression = isTaggedTemplateExpression;
    exports.isTemplateElement = isTemplateElement;
    exports.isTemplateLiteral = isTemplateLiteral;
    exports.isTerminatorless = isTerminatorless;
    exports.isThisExpression = isThisExpression;
    exports.isThisTypeAnnotation = isThisTypeAnnotation;
    exports.isThrowStatement = isThrowStatement;
    exports.isTopicReference = isTopicReference;
    exports.isTryStatement = isTryStatement;
    exports.isTupleExpression = isTupleExpression;
    exports.isTupleTypeAnnotation = isTupleTypeAnnotation;
    exports.isTypeAlias = isTypeAlias;
    exports.isTypeAnnotation = isTypeAnnotation;
    exports.isTypeCastExpression = isTypeCastExpression;
    exports.isTypeParameter = isTypeParameter;
    exports.isTypeParameterDeclaration = isTypeParameterDeclaration;
    exports.isTypeParameterInstantiation = isTypeParameterInstantiation;
    exports.isTypeScript = isTypeScript;
    exports.isTypeofTypeAnnotation = isTypeofTypeAnnotation;
    exports.isUnaryExpression = isUnaryExpression;
    exports.isUnaryLike = isUnaryLike;
    exports.isUnionTypeAnnotation = isUnionTypeAnnotation;
    exports.isUpdateExpression = isUpdateExpression;
    exports.isUserWhitespacable = isUserWhitespacable;
    exports.isV8IntrinsicIdentifier = isV8IntrinsicIdentifier;
    exports.isVariableDeclaration = isVariableDeclaration;
    exports.isVariableDeclarator = isVariableDeclarator;
    exports.isVariance = isVariance;
    exports.isVoidTypeAnnotation = isVoidTypeAnnotation;
    exports.isWhile = isWhile;
    exports.isWhileStatement = isWhileStatement;
    exports.isWithStatement = isWithStatement;
    exports.isYieldExpression = isYieldExpression;
    var _shallowEqual = require_shallowEqual();
    var _deprecationWarning = require_deprecationWarning();
    function isArrayExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "ArrayExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isAssignmentExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "AssignmentExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isBinaryExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "BinaryExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isInterpreterDirective(node, opts) {
      if (!node) return false;
      if (node.type !== "InterpreterDirective") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDirective(node, opts) {
      if (!node) return false;
      if (node.type !== "Directive") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDirectiveLiteral(node, opts) {
      if (!node) return false;
      if (node.type !== "DirectiveLiteral") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isBlockStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "BlockStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isBreakStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "BreakStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isCallExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "CallExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isCatchClause(node, opts) {
      if (!node) return false;
      if (node.type !== "CatchClause") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isConditionalExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "ConditionalExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isContinueStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "ContinueStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDebuggerStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "DebuggerStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDoWhileStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "DoWhileStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isEmptyStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "EmptyStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isExpressionStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "ExpressionStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isFile(node, opts) {
      if (!node) return false;
      if (node.type !== "File") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isForInStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "ForInStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isForStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "ForStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isFunctionDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "FunctionDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isFunctionExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "FunctionExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isIdentifier(node, opts) {
      if (!node) return false;
      if (node.type !== "Identifier") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isIfStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "IfStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isLabeledStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "LabeledStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isStringLiteral(node, opts) {
      if (!node) return false;
      if (node.type !== "StringLiteral") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isNumericLiteral(node, opts) {
      if (!node) return false;
      if (node.type !== "NumericLiteral") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isNullLiteral(node, opts) {
      if (!node) return false;
      if (node.type !== "NullLiteral") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isBooleanLiteral(node, opts) {
      if (!node) return false;
      if (node.type !== "BooleanLiteral") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isRegExpLiteral(node, opts) {
      if (!node) return false;
      if (node.type !== "RegExpLiteral") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isLogicalExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "LogicalExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isMemberExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "MemberExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isNewExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "NewExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isProgram(node, opts) {
      if (!node) return false;
      if (node.type !== "Program") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isObjectExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "ObjectExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isObjectMethod(node, opts) {
      if (!node) return false;
      if (node.type !== "ObjectMethod") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isObjectProperty(node, opts) {
      if (!node) return false;
      if (node.type !== "ObjectProperty") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isRestElement(node, opts) {
      if (!node) return false;
      if (node.type !== "RestElement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isReturnStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "ReturnStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isSequenceExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "SequenceExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isParenthesizedExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "ParenthesizedExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isSwitchCase(node, opts) {
      if (!node) return false;
      if (node.type !== "SwitchCase") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isSwitchStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "SwitchStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isThisExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "ThisExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isThrowStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "ThrowStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTryStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "TryStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isUnaryExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "UnaryExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isUpdateExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "UpdateExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isVariableDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "VariableDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isVariableDeclarator(node, opts) {
      if (!node) return false;
      if (node.type !== "VariableDeclarator") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isWhileStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "WhileStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isWithStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "WithStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isAssignmentPattern(node, opts) {
      if (!node) return false;
      if (node.type !== "AssignmentPattern") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isArrayPattern(node, opts) {
      if (!node) return false;
      if (node.type !== "ArrayPattern") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isArrowFunctionExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "ArrowFunctionExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isClassBody(node, opts) {
      if (!node) return false;
      if (node.type !== "ClassBody") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isClassExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "ClassExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isClassDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "ClassDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isExportAllDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "ExportAllDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isExportDefaultDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "ExportDefaultDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isExportNamedDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "ExportNamedDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isExportSpecifier(node, opts) {
      if (!node) return false;
      if (node.type !== "ExportSpecifier") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isForOfStatement(node, opts) {
      if (!node) return false;
      if (node.type !== "ForOfStatement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isImportDeclaration2(node, opts) {
      if (!node) return false;
      if (node.type !== "ImportDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isImportDefaultSpecifier(node, opts) {
      if (!node) return false;
      if (node.type !== "ImportDefaultSpecifier") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isImportNamespaceSpecifier(node, opts) {
      if (!node) return false;
      if (node.type !== "ImportNamespaceSpecifier") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isImportSpecifier(node, opts) {
      if (!node) return false;
      if (node.type !== "ImportSpecifier") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isImportExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "ImportExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isMetaProperty(node, opts) {
      if (!node) return false;
      if (node.type !== "MetaProperty") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isClassMethod(node, opts) {
      if (!node) return false;
      if (node.type !== "ClassMethod") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isObjectPattern(node, opts) {
      if (!node) return false;
      if (node.type !== "ObjectPattern") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isSpreadElement(node, opts) {
      if (!node) return false;
      if (node.type !== "SpreadElement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isSuper(node, opts) {
      if (!node) return false;
      if (node.type !== "Super") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTaggedTemplateExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "TaggedTemplateExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTemplateElement(node, opts) {
      if (!node) return false;
      if (node.type !== "TemplateElement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTemplateLiteral(node, opts) {
      if (!node) return false;
      if (node.type !== "TemplateLiteral") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isYieldExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "YieldExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isAwaitExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "AwaitExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isImport(node, opts) {
      if (!node) return false;
      if (node.type !== "Import") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isBigIntLiteral(node, opts) {
      if (!node) return false;
      if (node.type !== "BigIntLiteral") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isExportNamespaceSpecifier(node, opts) {
      if (!node) return false;
      if (node.type !== "ExportNamespaceSpecifier") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isOptionalMemberExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "OptionalMemberExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isOptionalCallExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "OptionalCallExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isClassProperty(node, opts) {
      if (!node) return false;
      if (node.type !== "ClassProperty") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isClassAccessorProperty(node, opts) {
      if (!node) return false;
      if (node.type !== "ClassAccessorProperty") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isClassPrivateProperty(node, opts) {
      if (!node) return false;
      if (node.type !== "ClassPrivateProperty") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isClassPrivateMethod(node, opts) {
      if (!node) return false;
      if (node.type !== "ClassPrivateMethod") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isPrivateName(node, opts) {
      if (!node) return false;
      if (node.type !== "PrivateName") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isStaticBlock(node, opts) {
      if (!node) return false;
      if (node.type !== "StaticBlock") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isAnyTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "AnyTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isArrayTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "ArrayTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isBooleanTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "BooleanTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isBooleanLiteralTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "BooleanLiteralTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isNullLiteralTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "NullLiteralTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isClassImplements(node, opts) {
      if (!node) return false;
      if (node.type !== "ClassImplements") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDeclareClass(node, opts) {
      if (!node) return false;
      if (node.type !== "DeclareClass") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDeclareFunction(node, opts) {
      if (!node) return false;
      if (node.type !== "DeclareFunction") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDeclareInterface(node, opts) {
      if (!node) return false;
      if (node.type !== "DeclareInterface") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDeclareModule(node, opts) {
      if (!node) return false;
      if (node.type !== "DeclareModule") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDeclareModuleExports(node, opts) {
      if (!node) return false;
      if (node.type !== "DeclareModuleExports") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDeclareTypeAlias(node, opts) {
      if (!node) return false;
      if (node.type !== "DeclareTypeAlias") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDeclareOpaqueType(node, opts) {
      if (!node) return false;
      if (node.type !== "DeclareOpaqueType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDeclareVariable(node, opts) {
      if (!node) return false;
      if (node.type !== "DeclareVariable") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDeclareExportDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "DeclareExportDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDeclareExportAllDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "DeclareExportAllDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDeclaredPredicate(node, opts) {
      if (!node) return false;
      if (node.type !== "DeclaredPredicate") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isExistsTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "ExistsTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isFunctionTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "FunctionTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isFunctionTypeParam(node, opts) {
      if (!node) return false;
      if (node.type !== "FunctionTypeParam") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isGenericTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "GenericTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isInferredPredicate(node, opts) {
      if (!node) return false;
      if (node.type !== "InferredPredicate") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isInterfaceExtends(node, opts) {
      if (!node) return false;
      if (node.type !== "InterfaceExtends") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isInterfaceDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "InterfaceDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isInterfaceTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "InterfaceTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isIntersectionTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "IntersectionTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isMixedTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "MixedTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isEmptyTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "EmptyTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isNullableTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "NullableTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isNumberLiteralTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "NumberLiteralTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isNumberTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "NumberTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isObjectTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "ObjectTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isObjectTypeInternalSlot(node, opts) {
      if (!node) return false;
      if (node.type !== "ObjectTypeInternalSlot") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isObjectTypeCallProperty(node, opts) {
      if (!node) return false;
      if (node.type !== "ObjectTypeCallProperty") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isObjectTypeIndexer(node, opts) {
      if (!node) return false;
      if (node.type !== "ObjectTypeIndexer") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isObjectTypeProperty(node, opts) {
      if (!node) return false;
      if (node.type !== "ObjectTypeProperty") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isObjectTypeSpreadProperty(node, opts) {
      if (!node) return false;
      if (node.type !== "ObjectTypeSpreadProperty") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isOpaqueType(node, opts) {
      if (!node) return false;
      if (node.type !== "OpaqueType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isQualifiedTypeIdentifier(node, opts) {
      if (!node) return false;
      if (node.type !== "QualifiedTypeIdentifier") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isStringLiteralTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "StringLiteralTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isStringTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "StringTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isSymbolTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "SymbolTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isThisTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "ThisTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTupleTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "TupleTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTypeofTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "TypeofTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTypeAlias(node, opts) {
      if (!node) return false;
      if (node.type !== "TypeAlias") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "TypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTypeCastExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "TypeCastExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTypeParameter(node, opts) {
      if (!node) return false;
      if (node.type !== "TypeParameter") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTypeParameterDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "TypeParameterDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTypeParameterInstantiation(node, opts) {
      if (!node) return false;
      if (node.type !== "TypeParameterInstantiation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isUnionTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "UnionTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isVariance(node, opts) {
      if (!node) return false;
      if (node.type !== "Variance") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isVoidTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "VoidTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isEnumDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "EnumDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isEnumBooleanBody(node, opts) {
      if (!node) return false;
      if (node.type !== "EnumBooleanBody") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isEnumNumberBody(node, opts) {
      if (!node) return false;
      if (node.type !== "EnumNumberBody") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isEnumStringBody(node, opts) {
      if (!node) return false;
      if (node.type !== "EnumStringBody") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isEnumSymbolBody(node, opts) {
      if (!node) return false;
      if (node.type !== "EnumSymbolBody") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isEnumBooleanMember(node, opts) {
      if (!node) return false;
      if (node.type !== "EnumBooleanMember") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isEnumNumberMember(node, opts) {
      if (!node) return false;
      if (node.type !== "EnumNumberMember") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isEnumStringMember(node, opts) {
      if (!node) return false;
      if (node.type !== "EnumStringMember") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isEnumDefaultedMember(node, opts) {
      if (!node) return false;
      if (node.type !== "EnumDefaultedMember") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isIndexedAccessType(node, opts) {
      if (!node) return false;
      if (node.type !== "IndexedAccessType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isOptionalIndexedAccessType(node, opts) {
      if (!node) return false;
      if (node.type !== "OptionalIndexedAccessType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXAttribute(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXAttribute") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXClosingElement(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXClosingElement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXElement(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXElement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXEmptyExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXEmptyExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXExpressionContainer(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXExpressionContainer") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXSpreadChild(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXSpreadChild") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXIdentifier(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXIdentifier") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXMemberExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXMemberExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXNamespacedName(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXNamespacedName") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXOpeningElement(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXOpeningElement") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXSpreadAttribute(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXSpreadAttribute") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXText(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXText") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXFragment(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXFragment") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXOpeningFragment(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXOpeningFragment") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSXClosingFragment(node, opts) {
      if (!node) return false;
      if (node.type !== "JSXClosingFragment") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isNoop(node, opts) {
      if (!node) return false;
      if (node.type !== "Noop") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isPlaceholder(node, opts) {
      if (!node) return false;
      if (node.type !== "Placeholder") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isV8IntrinsicIdentifier(node, opts) {
      if (!node) return false;
      if (node.type !== "V8IntrinsicIdentifier") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isArgumentPlaceholder(node, opts) {
      if (!node) return false;
      if (node.type !== "ArgumentPlaceholder") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isBindExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "BindExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isImportAttribute(node, opts) {
      if (!node) return false;
      if (node.type !== "ImportAttribute") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDecorator(node, opts) {
      if (!node) return false;
      if (node.type !== "Decorator") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDoExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "DoExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isExportDefaultSpecifier(node, opts) {
      if (!node) return false;
      if (node.type !== "ExportDefaultSpecifier") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isRecordExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "RecordExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTupleExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "TupleExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDecimalLiteral(node, opts) {
      if (!node) return false;
      if (node.type !== "DecimalLiteral") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isModuleExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "ModuleExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTopicReference(node, opts) {
      if (!node) return false;
      if (node.type !== "TopicReference") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isPipelineTopicExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "PipelineTopicExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isPipelineBareFunction(node, opts) {
      if (!node) return false;
      if (node.type !== "PipelineBareFunction") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isPipelinePrimaryTopicReference(node, opts) {
      if (!node) return false;
      if (node.type !== "PipelinePrimaryTopicReference") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSParameterProperty(node, opts) {
      if (!node) return false;
      if (node.type !== "TSParameterProperty") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSDeclareFunction(node, opts) {
      if (!node) return false;
      if (node.type !== "TSDeclareFunction") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSDeclareMethod(node, opts) {
      if (!node) return false;
      if (node.type !== "TSDeclareMethod") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSQualifiedName(node, opts) {
      if (!node) return false;
      if (node.type !== "TSQualifiedName") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSCallSignatureDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "TSCallSignatureDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSConstructSignatureDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "TSConstructSignatureDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSPropertySignature(node, opts) {
      if (!node) return false;
      if (node.type !== "TSPropertySignature") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSMethodSignature(node, opts) {
      if (!node) return false;
      if (node.type !== "TSMethodSignature") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSIndexSignature(node, opts) {
      if (!node) return false;
      if (node.type !== "TSIndexSignature") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSAnyKeyword(node, opts) {
      if (!node) return false;
      if (node.type !== "TSAnyKeyword") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSBooleanKeyword(node, opts) {
      if (!node) return false;
      if (node.type !== "TSBooleanKeyword") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSBigIntKeyword(node, opts) {
      if (!node) return false;
      if (node.type !== "TSBigIntKeyword") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSIntrinsicKeyword(node, opts) {
      if (!node) return false;
      if (node.type !== "TSIntrinsicKeyword") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSNeverKeyword(node, opts) {
      if (!node) return false;
      if (node.type !== "TSNeverKeyword") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSNullKeyword(node, opts) {
      if (!node) return false;
      if (node.type !== "TSNullKeyword") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSNumberKeyword(node, opts) {
      if (!node) return false;
      if (node.type !== "TSNumberKeyword") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSObjectKeyword(node, opts) {
      if (!node) return false;
      if (node.type !== "TSObjectKeyword") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSStringKeyword(node, opts) {
      if (!node) return false;
      if (node.type !== "TSStringKeyword") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSSymbolKeyword(node, opts) {
      if (!node) return false;
      if (node.type !== "TSSymbolKeyword") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSUndefinedKeyword(node, opts) {
      if (!node) return false;
      if (node.type !== "TSUndefinedKeyword") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSUnknownKeyword(node, opts) {
      if (!node) return false;
      if (node.type !== "TSUnknownKeyword") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSVoidKeyword(node, opts) {
      if (!node) return false;
      if (node.type !== "TSVoidKeyword") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSThisType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSThisType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSFunctionType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSFunctionType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSConstructorType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSConstructorType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSTypeReference(node, opts) {
      if (!node) return false;
      if (node.type !== "TSTypeReference") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSTypePredicate(node, opts) {
      if (!node) return false;
      if (node.type !== "TSTypePredicate") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSTypeQuery(node, opts) {
      if (!node) return false;
      if (node.type !== "TSTypeQuery") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSTypeLiteral(node, opts) {
      if (!node) return false;
      if (node.type !== "TSTypeLiteral") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSArrayType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSArrayType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSTupleType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSTupleType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSOptionalType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSOptionalType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSRestType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSRestType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSNamedTupleMember(node, opts) {
      if (!node) return false;
      if (node.type !== "TSNamedTupleMember") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSUnionType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSUnionType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSIntersectionType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSIntersectionType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSConditionalType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSConditionalType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSInferType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSInferType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSParenthesizedType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSParenthesizedType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSTypeOperator(node, opts) {
      if (!node) return false;
      if (node.type !== "TSTypeOperator") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSIndexedAccessType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSIndexedAccessType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSMappedType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSMappedType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSLiteralType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSLiteralType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSExpressionWithTypeArguments(node, opts) {
      if (!node) return false;
      if (node.type !== "TSExpressionWithTypeArguments") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSInterfaceDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "TSInterfaceDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSInterfaceBody(node, opts) {
      if (!node) return false;
      if (node.type !== "TSInterfaceBody") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSTypeAliasDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "TSTypeAliasDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSInstantiationExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "TSInstantiationExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSAsExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "TSAsExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSSatisfiesExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "TSSatisfiesExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSTypeAssertion(node, opts) {
      if (!node) return false;
      if (node.type !== "TSTypeAssertion") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSEnumDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "TSEnumDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSEnumMember(node, opts) {
      if (!node) return false;
      if (node.type !== "TSEnumMember") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSModuleDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "TSModuleDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSModuleBlock(node, opts) {
      if (!node) return false;
      if (node.type !== "TSModuleBlock") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSImportType(node, opts) {
      if (!node) return false;
      if (node.type !== "TSImportType") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSImportEqualsDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "TSImportEqualsDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSExternalModuleReference(node, opts) {
      if (!node) return false;
      if (node.type !== "TSExternalModuleReference") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSNonNullExpression(node, opts) {
      if (!node) return false;
      if (node.type !== "TSNonNullExpression") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSExportAssignment(node, opts) {
      if (!node) return false;
      if (node.type !== "TSExportAssignment") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSNamespaceExportDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "TSNamespaceExportDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSTypeAnnotation(node, opts) {
      if (!node) return false;
      if (node.type !== "TSTypeAnnotation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSTypeParameterInstantiation(node, opts) {
      if (!node) return false;
      if (node.type !== "TSTypeParameterInstantiation") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSTypeParameterDeclaration(node, opts) {
      if (!node) return false;
      if (node.type !== "TSTypeParameterDeclaration") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSTypeParameter(node, opts) {
      if (!node) return false;
      if (node.type !== "TSTypeParameter") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isStandardized(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ArrayExpression":
        case "AssignmentExpression":
        case "BinaryExpression":
        case "InterpreterDirective":
        case "Directive":
        case "DirectiveLiteral":
        case "BlockStatement":
        case "BreakStatement":
        case "CallExpression":
        case "CatchClause":
        case "ConditionalExpression":
        case "ContinueStatement":
        case "DebuggerStatement":
        case "DoWhileStatement":
        case "EmptyStatement":
        case "ExpressionStatement":
        case "File":
        case "ForInStatement":
        case "ForStatement":
        case "FunctionDeclaration":
        case "FunctionExpression":
        case "Identifier":
        case "IfStatement":
        case "LabeledStatement":
        case "StringLiteral":
        case "NumericLiteral":
        case "NullLiteral":
        case "BooleanLiteral":
        case "RegExpLiteral":
        case "LogicalExpression":
        case "MemberExpression":
        case "NewExpression":
        case "Program":
        case "ObjectExpression":
        case "ObjectMethod":
        case "ObjectProperty":
        case "RestElement":
        case "ReturnStatement":
        case "SequenceExpression":
        case "ParenthesizedExpression":
        case "SwitchCase":
        case "SwitchStatement":
        case "ThisExpression":
        case "ThrowStatement":
        case "TryStatement":
        case "UnaryExpression":
        case "UpdateExpression":
        case "VariableDeclaration":
        case "VariableDeclarator":
        case "WhileStatement":
        case "WithStatement":
        case "AssignmentPattern":
        case "ArrayPattern":
        case "ArrowFunctionExpression":
        case "ClassBody":
        case "ClassExpression":
        case "ClassDeclaration":
        case "ExportAllDeclaration":
        case "ExportDefaultDeclaration":
        case "ExportNamedDeclaration":
        case "ExportSpecifier":
        case "ForOfStatement":
        case "ImportDeclaration":
        case "ImportDefaultSpecifier":
        case "ImportNamespaceSpecifier":
        case "ImportSpecifier":
        case "ImportExpression":
        case "MetaProperty":
        case "ClassMethod":
        case "ObjectPattern":
        case "SpreadElement":
        case "Super":
        case "TaggedTemplateExpression":
        case "TemplateElement":
        case "TemplateLiteral":
        case "YieldExpression":
        case "AwaitExpression":
        case "Import":
        case "BigIntLiteral":
        case "ExportNamespaceSpecifier":
        case "OptionalMemberExpression":
        case "OptionalCallExpression":
        case "ClassProperty":
        case "ClassAccessorProperty":
        case "ClassPrivateProperty":
        case "ClassPrivateMethod":
        case "PrivateName":
        case "StaticBlock":
          break;
        case "Placeholder":
          switch (node.expectedNode) {
            case "Identifier":
            case "StringLiteral":
            case "BlockStatement":
            case "ClassBody":
              break;
            default:
              return false;
          }
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isExpression(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ArrayExpression":
        case "AssignmentExpression":
        case "BinaryExpression":
        case "CallExpression":
        case "ConditionalExpression":
        case "FunctionExpression":
        case "Identifier":
        case "StringLiteral":
        case "NumericLiteral":
        case "NullLiteral":
        case "BooleanLiteral":
        case "RegExpLiteral":
        case "LogicalExpression":
        case "MemberExpression":
        case "NewExpression":
        case "ObjectExpression":
        case "SequenceExpression":
        case "ParenthesizedExpression":
        case "ThisExpression":
        case "UnaryExpression":
        case "UpdateExpression":
        case "ArrowFunctionExpression":
        case "ClassExpression":
        case "ImportExpression":
        case "MetaProperty":
        case "Super":
        case "TaggedTemplateExpression":
        case "TemplateLiteral":
        case "YieldExpression":
        case "AwaitExpression":
        case "Import":
        case "BigIntLiteral":
        case "OptionalMemberExpression":
        case "OptionalCallExpression":
        case "TypeCastExpression":
        case "JSXElement":
        case "JSXFragment":
        case "BindExpression":
        case "DoExpression":
        case "RecordExpression":
        case "TupleExpression":
        case "DecimalLiteral":
        case "ModuleExpression":
        case "TopicReference":
        case "PipelineTopicExpression":
        case "PipelineBareFunction":
        case "PipelinePrimaryTopicReference":
        case "TSInstantiationExpression":
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "TSTypeAssertion":
        case "TSNonNullExpression":
          break;
        case "Placeholder":
          switch (node.expectedNode) {
            case "Expression":
            case "Identifier":
            case "StringLiteral":
              break;
            default:
              return false;
          }
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isBinary(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "BinaryExpression":
        case "LogicalExpression":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isScopable(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "BlockStatement":
        case "CatchClause":
        case "DoWhileStatement":
        case "ForInStatement":
        case "ForStatement":
        case "FunctionDeclaration":
        case "FunctionExpression":
        case "Program":
        case "ObjectMethod":
        case "SwitchStatement":
        case "WhileStatement":
        case "ArrowFunctionExpression":
        case "ClassExpression":
        case "ClassDeclaration":
        case "ForOfStatement":
        case "ClassMethod":
        case "ClassPrivateMethod":
        case "StaticBlock":
        case "TSModuleBlock":
          break;
        case "Placeholder":
          if (node.expectedNode === "BlockStatement") break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isBlockParent(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "BlockStatement":
        case "CatchClause":
        case "DoWhileStatement":
        case "ForInStatement":
        case "ForStatement":
        case "FunctionDeclaration":
        case "FunctionExpression":
        case "Program":
        case "ObjectMethod":
        case "SwitchStatement":
        case "WhileStatement":
        case "ArrowFunctionExpression":
        case "ForOfStatement":
        case "ClassMethod":
        case "ClassPrivateMethod":
        case "StaticBlock":
        case "TSModuleBlock":
          break;
        case "Placeholder":
          if (node.expectedNode === "BlockStatement") break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isBlock(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "BlockStatement":
        case "Program":
        case "TSModuleBlock":
          break;
        case "Placeholder":
          if (node.expectedNode === "BlockStatement") break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isStatement(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "BlockStatement":
        case "BreakStatement":
        case "ContinueStatement":
        case "DebuggerStatement":
        case "DoWhileStatement":
        case "EmptyStatement":
        case "ExpressionStatement":
        case "ForInStatement":
        case "ForStatement":
        case "FunctionDeclaration":
        case "IfStatement":
        case "LabeledStatement":
        case "ReturnStatement":
        case "SwitchStatement":
        case "ThrowStatement":
        case "TryStatement":
        case "VariableDeclaration":
        case "WhileStatement":
        case "WithStatement":
        case "ClassDeclaration":
        case "ExportAllDeclaration":
        case "ExportDefaultDeclaration":
        case "ExportNamedDeclaration":
        case "ForOfStatement":
        case "ImportDeclaration":
        case "DeclareClass":
        case "DeclareFunction":
        case "DeclareInterface":
        case "DeclareModule":
        case "DeclareModuleExports":
        case "DeclareTypeAlias":
        case "DeclareOpaqueType":
        case "DeclareVariable":
        case "DeclareExportDeclaration":
        case "DeclareExportAllDeclaration":
        case "InterfaceDeclaration":
        case "OpaqueType":
        case "TypeAlias":
        case "EnumDeclaration":
        case "TSDeclareFunction":
        case "TSInterfaceDeclaration":
        case "TSTypeAliasDeclaration":
        case "TSEnumDeclaration":
        case "TSModuleDeclaration":
        case "TSImportEqualsDeclaration":
        case "TSExportAssignment":
        case "TSNamespaceExportDeclaration":
          break;
        case "Placeholder":
          switch (node.expectedNode) {
            case "Statement":
            case "Declaration":
            case "BlockStatement":
              break;
            default:
              return false;
          }
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTerminatorless(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "BreakStatement":
        case "ContinueStatement":
        case "ReturnStatement":
        case "ThrowStatement":
        case "YieldExpression":
        case "AwaitExpression":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isCompletionStatement(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "BreakStatement":
        case "ContinueStatement":
        case "ReturnStatement":
        case "ThrowStatement":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isConditional(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ConditionalExpression":
        case "IfStatement":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isLoop(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "DoWhileStatement":
        case "ForInStatement":
        case "ForStatement":
        case "WhileStatement":
        case "ForOfStatement":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isWhile(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "DoWhileStatement":
        case "WhileStatement":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isExpressionWrapper(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ExpressionStatement":
        case "ParenthesizedExpression":
        case "TypeCastExpression":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isFor(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ForInStatement":
        case "ForStatement":
        case "ForOfStatement":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isForXStatement(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ForInStatement":
        case "ForOfStatement":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isFunction(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "FunctionDeclaration":
        case "FunctionExpression":
        case "ObjectMethod":
        case "ArrowFunctionExpression":
        case "ClassMethod":
        case "ClassPrivateMethod":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isFunctionParent(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "FunctionDeclaration":
        case "FunctionExpression":
        case "ObjectMethod":
        case "ArrowFunctionExpression":
        case "ClassMethod":
        case "ClassPrivateMethod":
        case "StaticBlock":
        case "TSModuleBlock":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isPureish(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "FunctionDeclaration":
        case "FunctionExpression":
        case "StringLiteral":
        case "NumericLiteral":
        case "NullLiteral":
        case "BooleanLiteral":
        case "RegExpLiteral":
        case "ArrowFunctionExpression":
        case "BigIntLiteral":
        case "DecimalLiteral":
          break;
        case "Placeholder":
          if (node.expectedNode === "StringLiteral") break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isDeclaration(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "FunctionDeclaration":
        case "VariableDeclaration":
        case "ClassDeclaration":
        case "ExportAllDeclaration":
        case "ExportDefaultDeclaration":
        case "ExportNamedDeclaration":
        case "ImportDeclaration":
        case "DeclareClass":
        case "DeclareFunction":
        case "DeclareInterface":
        case "DeclareModule":
        case "DeclareModuleExports":
        case "DeclareTypeAlias":
        case "DeclareOpaqueType":
        case "DeclareVariable":
        case "DeclareExportDeclaration":
        case "DeclareExportAllDeclaration":
        case "InterfaceDeclaration":
        case "OpaqueType":
        case "TypeAlias":
        case "EnumDeclaration":
        case "TSDeclareFunction":
        case "TSInterfaceDeclaration":
        case "TSTypeAliasDeclaration":
        case "TSEnumDeclaration":
        case "TSModuleDeclaration":
          break;
        case "Placeholder":
          if (node.expectedNode === "Declaration") break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isPatternLike(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "Identifier":
        case "RestElement":
        case "AssignmentPattern":
        case "ArrayPattern":
        case "ObjectPattern":
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "TSTypeAssertion":
        case "TSNonNullExpression":
          break;
        case "Placeholder":
          switch (node.expectedNode) {
            case "Pattern":
            case "Identifier":
              break;
            default:
              return false;
          }
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isLVal(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "Identifier":
        case "MemberExpression":
        case "RestElement":
        case "AssignmentPattern":
        case "ArrayPattern":
        case "ObjectPattern":
        case "TSParameterProperty":
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "TSTypeAssertion":
        case "TSNonNullExpression":
          break;
        case "Placeholder":
          switch (node.expectedNode) {
            case "Pattern":
            case "Identifier":
              break;
            default:
              return false;
          }
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSEntityName(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "Identifier":
        case "TSQualifiedName":
          break;
        case "Placeholder":
          if (node.expectedNode === "Identifier") break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isLiteral(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "StringLiteral":
        case "NumericLiteral":
        case "NullLiteral":
        case "BooleanLiteral":
        case "RegExpLiteral":
        case "TemplateLiteral":
        case "BigIntLiteral":
        case "DecimalLiteral":
          break;
        case "Placeholder":
          if (node.expectedNode === "StringLiteral") break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isImmutable(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "StringLiteral":
        case "NumericLiteral":
        case "NullLiteral":
        case "BooleanLiteral":
        case "BigIntLiteral":
        case "JSXAttribute":
        case "JSXClosingElement":
        case "JSXElement":
        case "JSXExpressionContainer":
        case "JSXSpreadChild":
        case "JSXOpeningElement":
        case "JSXText":
        case "JSXFragment":
        case "JSXOpeningFragment":
        case "JSXClosingFragment":
        case "DecimalLiteral":
          break;
        case "Placeholder":
          if (node.expectedNode === "StringLiteral") break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isUserWhitespacable(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ObjectMethod":
        case "ObjectProperty":
        case "ObjectTypeInternalSlot":
        case "ObjectTypeCallProperty":
        case "ObjectTypeIndexer":
        case "ObjectTypeProperty":
        case "ObjectTypeSpreadProperty":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isMethod(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ObjectMethod":
        case "ClassMethod":
        case "ClassPrivateMethod":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isObjectMember(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ObjectMethod":
        case "ObjectProperty":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isProperty(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ObjectProperty":
        case "ClassProperty":
        case "ClassAccessorProperty":
        case "ClassPrivateProperty":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isUnaryLike(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "UnaryExpression":
        case "SpreadElement":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isPattern(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "AssignmentPattern":
        case "ArrayPattern":
        case "ObjectPattern":
          break;
        case "Placeholder":
          if (node.expectedNode === "Pattern") break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isClass(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ClassExpression":
        case "ClassDeclaration":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isImportOrExportDeclaration(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ExportAllDeclaration":
        case "ExportDefaultDeclaration":
        case "ExportNamedDeclaration":
        case "ImportDeclaration":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isExportDeclaration(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ExportAllDeclaration":
        case "ExportDefaultDeclaration":
        case "ExportNamedDeclaration":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isModuleSpecifier(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ExportSpecifier":
        case "ImportDefaultSpecifier":
        case "ImportNamespaceSpecifier":
        case "ImportSpecifier":
        case "ExportNamespaceSpecifier":
        case "ExportDefaultSpecifier":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isAccessor(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ClassAccessorProperty":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isPrivate(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "ClassPrivateProperty":
        case "ClassPrivateMethod":
        case "PrivateName":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isFlow(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "AnyTypeAnnotation":
        case "ArrayTypeAnnotation":
        case "BooleanTypeAnnotation":
        case "BooleanLiteralTypeAnnotation":
        case "NullLiteralTypeAnnotation":
        case "ClassImplements":
        case "DeclareClass":
        case "DeclareFunction":
        case "DeclareInterface":
        case "DeclareModule":
        case "DeclareModuleExports":
        case "DeclareTypeAlias":
        case "DeclareOpaqueType":
        case "DeclareVariable":
        case "DeclareExportDeclaration":
        case "DeclareExportAllDeclaration":
        case "DeclaredPredicate":
        case "ExistsTypeAnnotation":
        case "FunctionTypeAnnotation":
        case "FunctionTypeParam":
        case "GenericTypeAnnotation":
        case "InferredPredicate":
        case "InterfaceExtends":
        case "InterfaceDeclaration":
        case "InterfaceTypeAnnotation":
        case "IntersectionTypeAnnotation":
        case "MixedTypeAnnotation":
        case "EmptyTypeAnnotation":
        case "NullableTypeAnnotation":
        case "NumberLiteralTypeAnnotation":
        case "NumberTypeAnnotation":
        case "ObjectTypeAnnotation":
        case "ObjectTypeInternalSlot":
        case "ObjectTypeCallProperty":
        case "ObjectTypeIndexer":
        case "ObjectTypeProperty":
        case "ObjectTypeSpreadProperty":
        case "OpaqueType":
        case "QualifiedTypeIdentifier":
        case "StringLiteralTypeAnnotation":
        case "StringTypeAnnotation":
        case "SymbolTypeAnnotation":
        case "ThisTypeAnnotation":
        case "TupleTypeAnnotation":
        case "TypeofTypeAnnotation":
        case "TypeAlias":
        case "TypeAnnotation":
        case "TypeCastExpression":
        case "TypeParameter":
        case "TypeParameterDeclaration":
        case "TypeParameterInstantiation":
        case "UnionTypeAnnotation":
        case "Variance":
        case "VoidTypeAnnotation":
        case "EnumDeclaration":
        case "EnumBooleanBody":
        case "EnumNumberBody":
        case "EnumStringBody":
        case "EnumSymbolBody":
        case "EnumBooleanMember":
        case "EnumNumberMember":
        case "EnumStringMember":
        case "EnumDefaultedMember":
        case "IndexedAccessType":
        case "OptionalIndexedAccessType":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isFlowType(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "AnyTypeAnnotation":
        case "ArrayTypeAnnotation":
        case "BooleanTypeAnnotation":
        case "BooleanLiteralTypeAnnotation":
        case "NullLiteralTypeAnnotation":
        case "ExistsTypeAnnotation":
        case "FunctionTypeAnnotation":
        case "GenericTypeAnnotation":
        case "InterfaceTypeAnnotation":
        case "IntersectionTypeAnnotation":
        case "MixedTypeAnnotation":
        case "EmptyTypeAnnotation":
        case "NullableTypeAnnotation":
        case "NumberLiteralTypeAnnotation":
        case "NumberTypeAnnotation":
        case "ObjectTypeAnnotation":
        case "StringLiteralTypeAnnotation":
        case "StringTypeAnnotation":
        case "SymbolTypeAnnotation":
        case "ThisTypeAnnotation":
        case "TupleTypeAnnotation":
        case "TypeofTypeAnnotation":
        case "UnionTypeAnnotation":
        case "VoidTypeAnnotation":
        case "IndexedAccessType":
        case "OptionalIndexedAccessType":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isFlowBaseAnnotation(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "AnyTypeAnnotation":
        case "BooleanTypeAnnotation":
        case "NullLiteralTypeAnnotation":
        case "MixedTypeAnnotation":
        case "EmptyTypeAnnotation":
        case "NumberTypeAnnotation":
        case "StringTypeAnnotation":
        case "SymbolTypeAnnotation":
        case "ThisTypeAnnotation":
        case "VoidTypeAnnotation":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isFlowDeclaration(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "DeclareClass":
        case "DeclareFunction":
        case "DeclareInterface":
        case "DeclareModule":
        case "DeclareModuleExports":
        case "DeclareTypeAlias":
        case "DeclareOpaqueType":
        case "DeclareVariable":
        case "DeclareExportDeclaration":
        case "DeclareExportAllDeclaration":
        case "InterfaceDeclaration":
        case "OpaqueType":
        case "TypeAlias":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isFlowPredicate(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "DeclaredPredicate":
        case "InferredPredicate":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isEnumBody(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "EnumBooleanBody":
        case "EnumNumberBody":
        case "EnumStringBody":
        case "EnumSymbolBody":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isEnumMember(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "EnumBooleanMember":
        case "EnumNumberMember":
        case "EnumStringMember":
        case "EnumDefaultedMember":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isJSX(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "JSXAttribute":
        case "JSXClosingElement":
        case "JSXElement":
        case "JSXEmptyExpression":
        case "JSXExpressionContainer":
        case "JSXSpreadChild":
        case "JSXIdentifier":
        case "JSXMemberExpression":
        case "JSXNamespacedName":
        case "JSXOpeningElement":
        case "JSXSpreadAttribute":
        case "JSXText":
        case "JSXFragment":
        case "JSXOpeningFragment":
        case "JSXClosingFragment":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isMiscellaneous(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "Noop":
        case "Placeholder":
        case "V8IntrinsicIdentifier":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTypeScript(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "TSParameterProperty":
        case "TSDeclareFunction":
        case "TSDeclareMethod":
        case "TSQualifiedName":
        case "TSCallSignatureDeclaration":
        case "TSConstructSignatureDeclaration":
        case "TSPropertySignature":
        case "TSMethodSignature":
        case "TSIndexSignature":
        case "TSAnyKeyword":
        case "TSBooleanKeyword":
        case "TSBigIntKeyword":
        case "TSIntrinsicKeyword":
        case "TSNeverKeyword":
        case "TSNullKeyword":
        case "TSNumberKeyword":
        case "TSObjectKeyword":
        case "TSStringKeyword":
        case "TSSymbolKeyword":
        case "TSUndefinedKeyword":
        case "TSUnknownKeyword":
        case "TSVoidKeyword":
        case "TSThisType":
        case "TSFunctionType":
        case "TSConstructorType":
        case "TSTypeReference":
        case "TSTypePredicate":
        case "TSTypeQuery":
        case "TSTypeLiteral":
        case "TSArrayType":
        case "TSTupleType":
        case "TSOptionalType":
        case "TSRestType":
        case "TSNamedTupleMember":
        case "TSUnionType":
        case "TSIntersectionType":
        case "TSConditionalType":
        case "TSInferType":
        case "TSParenthesizedType":
        case "TSTypeOperator":
        case "TSIndexedAccessType":
        case "TSMappedType":
        case "TSLiteralType":
        case "TSExpressionWithTypeArguments":
        case "TSInterfaceDeclaration":
        case "TSInterfaceBody":
        case "TSTypeAliasDeclaration":
        case "TSInstantiationExpression":
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "TSTypeAssertion":
        case "TSEnumDeclaration":
        case "TSEnumMember":
        case "TSModuleDeclaration":
        case "TSModuleBlock":
        case "TSImportType":
        case "TSImportEqualsDeclaration":
        case "TSExternalModuleReference":
        case "TSNonNullExpression":
        case "TSExportAssignment":
        case "TSNamespaceExportDeclaration":
        case "TSTypeAnnotation":
        case "TSTypeParameterInstantiation":
        case "TSTypeParameterDeclaration":
        case "TSTypeParameter":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSTypeElement(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "TSCallSignatureDeclaration":
        case "TSConstructSignatureDeclaration":
        case "TSPropertySignature":
        case "TSMethodSignature":
        case "TSIndexSignature":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSType(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "TSAnyKeyword":
        case "TSBooleanKeyword":
        case "TSBigIntKeyword":
        case "TSIntrinsicKeyword":
        case "TSNeverKeyword":
        case "TSNullKeyword":
        case "TSNumberKeyword":
        case "TSObjectKeyword":
        case "TSStringKeyword":
        case "TSSymbolKeyword":
        case "TSUndefinedKeyword":
        case "TSUnknownKeyword":
        case "TSVoidKeyword":
        case "TSThisType":
        case "TSFunctionType":
        case "TSConstructorType":
        case "TSTypeReference":
        case "TSTypePredicate":
        case "TSTypeQuery":
        case "TSTypeLiteral":
        case "TSArrayType":
        case "TSTupleType":
        case "TSOptionalType":
        case "TSRestType":
        case "TSUnionType":
        case "TSIntersectionType":
        case "TSConditionalType":
        case "TSInferType":
        case "TSParenthesizedType":
        case "TSTypeOperator":
        case "TSIndexedAccessType":
        case "TSMappedType":
        case "TSLiteralType":
        case "TSExpressionWithTypeArguments":
        case "TSImportType":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isTSBaseType(node, opts) {
      if (!node) return false;
      switch (node.type) {
        case "TSAnyKeyword":
        case "TSBooleanKeyword":
        case "TSBigIntKeyword":
        case "TSIntrinsicKeyword":
        case "TSNeverKeyword":
        case "TSNullKeyword":
        case "TSNumberKeyword":
        case "TSObjectKeyword":
        case "TSStringKeyword":
        case "TSSymbolKeyword":
        case "TSUndefinedKeyword":
        case "TSUnknownKeyword":
        case "TSVoidKeyword":
        case "TSThisType":
        case "TSLiteralType":
          break;
        default:
          return false;
      }
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isNumberLiteral(node, opts) {
      (0, _deprecationWarning.default)("isNumberLiteral", "isNumericLiteral");
      if (!node) return false;
      if (node.type !== "NumberLiteral") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isRegexLiteral(node, opts) {
      (0, _deprecationWarning.default)("isRegexLiteral", "isRegExpLiteral");
      if (!node) return false;
      if (node.type !== "RegexLiteral") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isRestProperty(node, opts) {
      (0, _deprecationWarning.default)("isRestProperty", "isRestElement");
      if (!node) return false;
      if (node.type !== "RestProperty") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isSpreadProperty(node, opts) {
      (0, _deprecationWarning.default)("isSpreadProperty", "isSpreadElement");
      if (!node) return false;
      if (node.type !== "SpreadProperty") return false;
      return opts == null || (0, _shallowEqual.default)(node, opts);
    }
    function isModuleDeclaration(node, opts) {
      (0, _deprecationWarning.default)("isModuleDeclaration", "isImportOrExportDeclaration");
      return isImportOrExportDeclaration(node, opts);
    }
  }
});

// node_modules/@babel/types/lib/validators/matchesPattern.js
var require_matchesPattern = __commonJS({
  "node_modules/@babel/types/lib/validators/matchesPattern.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = matchesPattern;
    var _index = require_generated();
    function matchesPattern(member, match, allowPartial) {
      if (!(0, _index.isMemberExpression)(member)) return false;
      const parts = Array.isArray(match) ? match : match.split(".");
      const nodes = [];
      let node;
      for (node = member; (0, _index.isMemberExpression)(node); node = node.object) {
        nodes.push(node.property);
      }
      nodes.push(node);
      if (nodes.length < parts.length) return false;
      if (!allowPartial && nodes.length > parts.length) return false;
      for (let i = 0, j = nodes.length - 1; i < parts.length; i++, j--) {
        const node2 = nodes[j];
        let value;
        if ((0, _index.isIdentifier)(node2)) {
          value = node2.name;
        } else if ((0, _index.isStringLiteral)(node2)) {
          value = node2.value;
        } else if ((0, _index.isThisExpression)(node2)) {
          value = "this";
        } else {
          return false;
        }
        if (parts[i] !== value) return false;
      }
      return true;
    }
  }
});

// node_modules/@babel/types/lib/validators/buildMatchMemberExpression.js
var require_buildMatchMemberExpression = __commonJS({
  "node_modules/@babel/types/lib/validators/buildMatchMemberExpression.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = buildMatchMemberExpression;
    var _matchesPattern = require_matchesPattern();
    function buildMatchMemberExpression(match, allowPartial) {
      const parts = match.split(".");
      return (member) => (0, _matchesPattern.default)(member, parts, allowPartial);
    }
  }
});

// node_modules/@babel/types/lib/validators/react/isReactComponent.js
var require_isReactComponent = __commonJS({
  "node_modules/@babel/types/lib/validators/react/isReactComponent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _buildMatchMemberExpression = require_buildMatchMemberExpression();
    var isReactComponent = (0, _buildMatchMemberExpression.default)("React.Component");
    var _default = exports.default = isReactComponent;
  }
});

// node_modules/@babel/types/lib/validators/react/isCompatTag.js
var require_isCompatTag = __commonJS({
  "node_modules/@babel/types/lib/validators/react/isCompatTag.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isCompatTag;
    function isCompatTag(tagName) {
      return !!tagName && /^[a-z]/.test(tagName);
    }
  }
});

// node_modules/to-fast-properties/index.js
var require_to_fast_properties = __commonJS({
  "node_modules/to-fast-properties/index.js"(exports, module) {
    "use strict";
    var fastProto = null;
    function FastObject(o) {
      if (fastProto !== null && typeof fastProto.property) {
        const result = fastProto;
        fastProto = FastObject.prototype = null;
        return result;
      }
      fastProto = FastObject.prototype = o == null ? /* @__PURE__ */ Object.create(null) : o;
      return new FastObject();
    }
    FastObject();
    module.exports = function toFastproperties(o) {
      return FastObject(o);
    };
  }
});

// node_modules/@babel/types/lib/validators/isType.js
var require_isType = __commonJS({
  "node_modules/@babel/types/lib/validators/isType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isType;
    var _index = require_definitions();
    function isType(nodeType, targetType) {
      if (nodeType === targetType) return true;
      if (nodeType == null) return false;
      if (_index.ALIAS_KEYS[targetType]) return false;
      const aliases = _index.FLIPPED_ALIAS_KEYS[targetType];
      if (aliases) {
        if (aliases[0] === nodeType) return true;
        for (const alias of aliases) {
          if (nodeType === alias) return true;
        }
      }
      return false;
    }
  }
});

// node_modules/@babel/types/lib/validators/isPlaceholderType.js
var require_isPlaceholderType = __commonJS({
  "node_modules/@babel/types/lib/validators/isPlaceholderType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isPlaceholderType;
    var _index = require_definitions();
    function isPlaceholderType(placeholderType, targetType) {
      if (placeholderType === targetType) return true;
      const aliases = _index.PLACEHOLDERS_ALIAS[placeholderType];
      if (aliases) {
        for (const alias of aliases) {
          if (targetType === alias) return true;
        }
      }
      return false;
    }
  }
});

// node_modules/@babel/types/lib/validators/is.js
var require_is = __commonJS({
  "node_modules/@babel/types/lib/validators/is.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = is;
    var _shallowEqual = require_shallowEqual();
    var _isType = require_isType();
    var _isPlaceholderType = require_isPlaceholderType();
    var _index = require_definitions();
    function is(type, node, opts) {
      if (!node) return false;
      const matches = (0, _isType.default)(node.type, type);
      if (!matches) {
        if (!opts && node.type === "Placeholder" && type in _index.FLIPPED_ALIAS_KEYS) {
          return (0, _isPlaceholderType.default)(node.expectedNode, type);
        }
        return false;
      }
      if (typeof opts === "undefined") {
        return true;
      } else {
        return (0, _shallowEqual.default)(node, opts);
      }
    }
  }
});

// node_modules/@babel/helper-validator-identifier/lib/identifier.js
var require_identifier = __commonJS({
  "node_modules/@babel/helper-validator-identifier/lib/identifier.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isIdentifierChar = isIdentifierChar;
    exports.isIdentifierName = isIdentifierName;
    exports.isIdentifierStart = isIdentifierStart;
    var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
    var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65";
    var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
    var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
    var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191];
    var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
    function isInAstralSet(code, set) {
      let pos = 65536;
      for (let i = 0, length = set.length; i < length; i += 2) {
        pos += set[i];
        if (pos > code) return false;
        pos += set[i + 1];
        if (pos >= code) return true;
      }
      return false;
    }
    function isIdentifierStart(code) {
      if (code < 65) return code === 36;
      if (code <= 90) return true;
      if (code < 97) return code === 95;
      if (code <= 122) return true;
      if (code <= 65535) {
        return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
      }
      return isInAstralSet(code, astralIdentifierStartCodes);
    }
    function isIdentifierChar(code) {
      if (code < 48) return code === 36;
      if (code < 58) return true;
      if (code < 65) return false;
      if (code <= 90) return true;
      if (code < 97) return code === 95;
      if (code <= 122) return true;
      if (code <= 65535) {
        return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
      }
      return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
    }
    function isIdentifierName(name) {
      let isFirst = true;
      for (let i = 0; i < name.length; i++) {
        let cp = name.charCodeAt(i);
        if ((cp & 64512) === 55296 && i + 1 < name.length) {
          const trail = name.charCodeAt(++i);
          if ((trail & 64512) === 56320) {
            cp = 65536 + ((cp & 1023) << 10) + (trail & 1023);
          }
        }
        if (isFirst) {
          isFirst = false;
          if (!isIdentifierStart(cp)) {
            return false;
          }
        } else if (!isIdentifierChar(cp)) {
          return false;
        }
      }
      return !isFirst;
    }
  }
});

// node_modules/@babel/helper-validator-identifier/lib/keyword.js
var require_keyword = __commonJS({
  "node_modules/@babel/helper-validator-identifier/lib/keyword.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isKeyword = isKeyword;
    exports.isReservedWord = isReservedWord;
    exports.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord;
    exports.isStrictBindReservedWord = isStrictBindReservedWord;
    exports.isStrictReservedWord = isStrictReservedWord;
    var reservedWords = {
      keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"],
      strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"],
      strictBind: ["eval", "arguments"]
    };
    var keywords = new Set(reservedWords.keyword);
    var reservedWordsStrictSet = new Set(reservedWords.strict);
    var reservedWordsStrictBindSet = new Set(reservedWords.strictBind);
    function isReservedWord(word, inModule) {
      return inModule && word === "await" || word === "enum";
    }
    function isStrictReservedWord(word, inModule) {
      return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
    }
    function isStrictBindOnlyReservedWord(word) {
      return reservedWordsStrictBindSet.has(word);
    }
    function isStrictBindReservedWord(word, inModule) {
      return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
    }
    function isKeyword(word) {
      return keywords.has(word);
    }
  }
});

// node_modules/@babel/helper-validator-identifier/lib/index.js
var require_lib = __commonJS({
  "node_modules/@babel/helper-validator-identifier/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "isIdentifierChar", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierChar;
      }
    });
    Object.defineProperty(exports, "isIdentifierName", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierName;
      }
    });
    Object.defineProperty(exports, "isIdentifierStart", {
      enumerable: true,
      get: function() {
        return _identifier.isIdentifierStart;
      }
    });
    Object.defineProperty(exports, "isKeyword", {
      enumerable: true,
      get: function() {
        return _keyword.isKeyword;
      }
    });
    Object.defineProperty(exports, "isReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isReservedWord;
      }
    });
    Object.defineProperty(exports, "isStrictBindOnlyReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictBindOnlyReservedWord;
      }
    });
    Object.defineProperty(exports, "isStrictBindReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictBindReservedWord;
      }
    });
    Object.defineProperty(exports, "isStrictReservedWord", {
      enumerable: true,
      get: function() {
        return _keyword.isStrictReservedWord;
      }
    });
    var _identifier = require_identifier();
    var _keyword = require_keyword();
  }
});

// node_modules/@babel/types/lib/validators/isValidIdentifier.js
var require_isValidIdentifier = __commonJS({
  "node_modules/@babel/types/lib/validators/isValidIdentifier.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isValidIdentifier;
    var _helperValidatorIdentifier = require_lib();
    function isValidIdentifier(name, reserved = true) {
      if (typeof name !== "string") return false;
      if (reserved) {
        if ((0, _helperValidatorIdentifier.isKeyword)(name) || (0, _helperValidatorIdentifier.isStrictReservedWord)(name, true)) {
          return false;
        }
      }
      return (0, _helperValidatorIdentifier.isIdentifierName)(name);
    }
  }
});

// node_modules/@babel/helper-string-parser/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/@babel/helper-string-parser/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.readCodePoint = readCodePoint;
    exports.readInt = readInt;
    exports.readStringContents = readStringContents;
    var _isDigit = function isDigit(code) {
      return code >= 48 && code <= 57;
    };
    var forbiddenNumericSeparatorSiblings = {
      decBinOct: /* @__PURE__ */ new Set([46, 66, 69, 79, 95, 98, 101, 111]),
      hex: /* @__PURE__ */ new Set([46, 88, 95, 120])
    };
    var isAllowedNumericSeparatorSibling = {
      bin: (ch) => ch === 48 || ch === 49,
      oct: (ch) => ch >= 48 && ch <= 55,
      dec: (ch) => ch >= 48 && ch <= 57,
      hex: (ch) => ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102
    };
    function readStringContents(type, input, pos, lineStart, curLine, errors) {
      const initialPos = pos;
      const initialLineStart = lineStart;
      const initialCurLine = curLine;
      let out = "";
      let firstInvalidLoc = null;
      let chunkStart = pos;
      const {
        length
      } = input;
      for (; ; ) {
        if (pos >= length) {
          errors.unterminated(initialPos, initialLineStart, initialCurLine);
          out += input.slice(chunkStart, pos);
          break;
        }
        const ch = input.charCodeAt(pos);
        if (isStringEnd(type, ch, input, pos)) {
          out += input.slice(chunkStart, pos);
          break;
        }
        if (ch === 92) {
          out += input.slice(chunkStart, pos);
          const res = readEscapedChar(input, pos, lineStart, curLine, type === "template", errors);
          if (res.ch === null && !firstInvalidLoc) {
            firstInvalidLoc = {
              pos,
              lineStart,
              curLine
            };
          } else {
            out += res.ch;
          }
          ({
            pos,
            lineStart,
            curLine
          } = res);
          chunkStart = pos;
        } else if (ch === 8232 || ch === 8233) {
          ++pos;
          ++curLine;
          lineStart = pos;
        } else if (ch === 10 || ch === 13) {
          if (type === "template") {
            out += input.slice(chunkStart, pos) + "\n";
            ++pos;
            if (ch === 13 && input.charCodeAt(pos) === 10) {
              ++pos;
            }
            ++curLine;
            chunkStart = lineStart = pos;
          } else {
            errors.unterminated(initialPos, initialLineStart, initialCurLine);
          }
        } else {
          ++pos;
        }
      }
      return {
        pos,
        str: out,
        firstInvalidLoc,
        lineStart,
        curLine,
        containsInvalid: !!firstInvalidLoc
      };
    }
    function isStringEnd(type, ch, input, pos) {
      if (type === "template") {
        return ch === 96 || ch === 36 && input.charCodeAt(pos + 1) === 123;
      }
      return ch === (type === "double" ? 34 : 39);
    }
    function readEscapedChar(input, pos, lineStart, curLine, inTemplate, errors) {
      const throwOnInvalid = !inTemplate;
      pos++;
      const res = (ch2) => ({
        pos,
        ch: ch2,
        lineStart,
        curLine
      });
      const ch = input.charCodeAt(pos++);
      switch (ch) {
        case 110:
          return res("\n");
        case 114:
          return res("\r");
        case 120: {
          let code;
          ({
            code,
            pos
          } = readHexChar(input, pos, lineStart, curLine, 2, false, throwOnInvalid, errors));
          return res(code === null ? null : String.fromCharCode(code));
        }
        case 117: {
          let code;
          ({
            code,
            pos
          } = readCodePoint(input, pos, lineStart, curLine, throwOnInvalid, errors));
          return res(code === null ? null : String.fromCodePoint(code));
        }
        case 116:
          return res("	");
        case 98:
          return res("\b");
        case 118:
          return res("\v");
        case 102:
          return res("\f");
        case 13:
          if (input.charCodeAt(pos) === 10) {
            ++pos;
          }
        case 10:
          lineStart = pos;
          ++curLine;
        case 8232:
        case 8233:
          return res("");
        case 56:
        case 57:
          if (inTemplate) {
            return res(null);
          } else {
            errors.strictNumericEscape(pos - 1, lineStart, curLine);
          }
        default:
          if (ch >= 48 && ch <= 55) {
            const startPos = pos - 1;
            const match = /^[0-7]+/.exec(input.slice(startPos, pos + 2));
            let octalStr = match[0];
            let octal = parseInt(octalStr, 8);
            if (octal > 255) {
              octalStr = octalStr.slice(0, -1);
              octal = parseInt(octalStr, 8);
            }
            pos += octalStr.length - 1;
            const next = input.charCodeAt(pos);
            if (octalStr !== "0" || next === 56 || next === 57) {
              if (inTemplate) {
                return res(null);
              } else {
                errors.strictNumericEscape(startPos, lineStart, curLine);
              }
            }
            return res(String.fromCharCode(octal));
          }
          return res(String.fromCharCode(ch));
      }
    }
    function readHexChar(input, pos, lineStart, curLine, len, forceLen, throwOnInvalid, errors) {
      const initialPos = pos;
      let n;
      ({
        n,
        pos
      } = readInt(input, pos, lineStart, curLine, 16, len, forceLen, false, errors, !throwOnInvalid));
      if (n === null) {
        if (throwOnInvalid) {
          errors.invalidEscapeSequence(initialPos, lineStart, curLine);
        } else {
          pos = initialPos - 1;
        }
      }
      return {
        code: n,
        pos
      };
    }
    function readInt(input, pos, lineStart, curLine, radix, len, forceLen, allowNumSeparator, errors, bailOnError) {
      const start = pos;
      const forbiddenSiblings = radix === 16 ? forbiddenNumericSeparatorSiblings.hex : forbiddenNumericSeparatorSiblings.decBinOct;
      const isAllowedSibling = radix === 16 ? isAllowedNumericSeparatorSibling.hex : radix === 10 ? isAllowedNumericSeparatorSibling.dec : radix === 8 ? isAllowedNumericSeparatorSibling.oct : isAllowedNumericSeparatorSibling.bin;
      let invalid = false;
      let total = 0;
      for (let i = 0, e = len == null ? Infinity : len; i < e; ++i) {
        const code = input.charCodeAt(pos);
        let val;
        if (code === 95 && allowNumSeparator !== "bail") {
          const prev = input.charCodeAt(pos - 1);
          const next = input.charCodeAt(pos + 1);
          if (!allowNumSeparator) {
            if (bailOnError) return {
              n: null,
              pos
            };
            errors.numericSeparatorInEscapeSequence(pos, lineStart, curLine);
          } else if (Number.isNaN(next) || !isAllowedSibling(next) || forbiddenSiblings.has(prev) || forbiddenSiblings.has(next)) {
            if (bailOnError) return {
              n: null,
              pos
            };
            errors.unexpectedNumericSeparator(pos, lineStart, curLine);
          }
          ++pos;
          continue;
        }
        if (code >= 97) {
          val = code - 97 + 10;
        } else if (code >= 65) {
          val = code - 65 + 10;
        } else if (_isDigit(code)) {
          val = code - 48;
        } else {
          val = Infinity;
        }
        if (val >= radix) {
          if (val <= 9 && bailOnError) {
            return {
              n: null,
              pos
            };
          } else if (val <= 9 && errors.invalidDigit(pos, lineStart, curLine, radix)) {
            val = 0;
          } else if (forceLen) {
            val = 0;
            invalid = true;
          } else {
            break;
          }
        }
        ++pos;
        total = total * radix + val;
      }
      if (pos === start || len != null && pos - start !== len || invalid) {
        return {
          n: null,
          pos
        };
      }
      return {
        n: total,
        pos
      };
    }
    function readCodePoint(input, pos, lineStart, curLine, throwOnInvalid, errors) {
      const ch = input.charCodeAt(pos);
      let code;
      if (ch === 123) {
        ++pos;
        ({
          code,
          pos
        } = readHexChar(input, pos, lineStart, curLine, input.indexOf("}", pos) - pos, true, throwOnInvalid, errors));
        ++pos;
        if (code !== null && code > 1114111) {
          if (throwOnInvalid) {
            errors.invalidCodePoint(pos, lineStart, curLine);
          } else {
            return {
              code: null,
              pos
            };
          }
        }
      } else {
        ({
          code,
          pos
        } = readHexChar(input, pos, lineStart, curLine, 4, false, throwOnInvalid, errors));
      }
      return {
        code,
        pos
      };
    }
  }
});

// node_modules/@babel/types/lib/constants/index.js
var require_constants = __commonJS({
  "node_modules/@babel/types/lib/constants/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UPDATE_OPERATORS = exports.UNARY_OPERATORS = exports.STRING_UNARY_OPERATORS = exports.STATEMENT_OR_BLOCK_KEYS = exports.NUMBER_UNARY_OPERATORS = exports.NUMBER_BINARY_OPERATORS = exports.NOT_LOCAL_BINDING = exports.LOGICAL_OPERATORS = exports.INHERIT_KEYS = exports.FOR_INIT_KEYS = exports.FLATTENABLE_KEYS = exports.EQUALITY_BINARY_OPERATORS = exports.COMPARISON_BINARY_OPERATORS = exports.COMMENT_KEYS = exports.BOOLEAN_UNARY_OPERATORS = exports.BOOLEAN_NUMBER_BINARY_OPERATORS = exports.BOOLEAN_BINARY_OPERATORS = exports.BLOCK_SCOPED_SYMBOL = exports.BINARY_OPERATORS = exports.ASSIGNMENT_OPERATORS = void 0;
    var STATEMENT_OR_BLOCK_KEYS = exports.STATEMENT_OR_BLOCK_KEYS = ["consequent", "body", "alternate"];
    var FLATTENABLE_KEYS = exports.FLATTENABLE_KEYS = ["body", "expressions"];
    var FOR_INIT_KEYS = exports.FOR_INIT_KEYS = ["left", "init"];
    var COMMENT_KEYS = exports.COMMENT_KEYS = ["leadingComments", "trailingComments", "innerComments"];
    var LOGICAL_OPERATORS = exports.LOGICAL_OPERATORS = ["||", "&&", "??"];
    var UPDATE_OPERATORS = exports.UPDATE_OPERATORS = ["++", "--"];
    var BOOLEAN_NUMBER_BINARY_OPERATORS = exports.BOOLEAN_NUMBER_BINARY_OPERATORS = [">", "<", ">=", "<="];
    var EQUALITY_BINARY_OPERATORS = exports.EQUALITY_BINARY_OPERATORS = ["==", "===", "!=", "!=="];
    var COMPARISON_BINARY_OPERATORS = exports.COMPARISON_BINARY_OPERATORS = [...EQUALITY_BINARY_OPERATORS, "in", "instanceof"];
    var BOOLEAN_BINARY_OPERATORS = exports.BOOLEAN_BINARY_OPERATORS = [...COMPARISON_BINARY_OPERATORS, ...BOOLEAN_NUMBER_BINARY_OPERATORS];
    var NUMBER_BINARY_OPERATORS = exports.NUMBER_BINARY_OPERATORS = ["-", "/", "%", "*", "**", "&", "|", ">>", ">>>", "<<", "^"];
    var BINARY_OPERATORS = exports.BINARY_OPERATORS = ["+", ...NUMBER_BINARY_OPERATORS, ...BOOLEAN_BINARY_OPERATORS, "|>"];
    var ASSIGNMENT_OPERATORS = exports.ASSIGNMENT_OPERATORS = ["=", "+=", ...NUMBER_BINARY_OPERATORS.map((op) => op + "="), ...LOGICAL_OPERATORS.map((op) => op + "=")];
    var BOOLEAN_UNARY_OPERATORS = exports.BOOLEAN_UNARY_OPERATORS = ["delete", "!"];
    var NUMBER_UNARY_OPERATORS = exports.NUMBER_UNARY_OPERATORS = ["+", "-", "~"];
    var STRING_UNARY_OPERATORS = exports.STRING_UNARY_OPERATORS = ["typeof"];
    var UNARY_OPERATORS = exports.UNARY_OPERATORS = ["void", "throw", ...BOOLEAN_UNARY_OPERATORS, ...NUMBER_UNARY_OPERATORS, ...STRING_UNARY_OPERATORS];
    var INHERIT_KEYS = exports.INHERIT_KEYS = {
      optional: ["typeAnnotation", "typeParameters", "returnType"],
      force: ["start", "loc", "end"]
    };
    var BLOCK_SCOPED_SYMBOL = exports.BLOCK_SCOPED_SYMBOL = Symbol.for("var used to be block scoped");
    var NOT_LOCAL_BINDING = exports.NOT_LOCAL_BINDING = Symbol.for("should not be considered a local binding");
  }
});

// node_modules/@babel/types/lib/definitions/utils.js
var require_utils = __commonJS({
  "node_modules/@babel/types/lib/definitions/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.VISITOR_KEYS = exports.NODE_PARENT_VALIDATIONS = exports.NODE_FIELDS = exports.FLIPPED_ALIAS_KEYS = exports.DEPRECATED_KEYS = exports.BUILDER_KEYS = exports.ALIAS_KEYS = void 0;
    exports.arrayOf = arrayOf;
    exports.arrayOfType = arrayOfType;
    exports.assertEach = assertEach;
    exports.assertNodeOrValueType = assertNodeOrValueType;
    exports.assertNodeType = assertNodeType;
    exports.assertOneOf = assertOneOf;
    exports.assertOptionalChainStart = assertOptionalChainStart;
    exports.assertShape = assertShape;
    exports.assertValueType = assertValueType;
    exports.chain = chain;
    exports.default = defineType;
    exports.defineAliasedType = defineAliasedType;
    exports.typeIs = typeIs;
    exports.validate = validate;
    exports.validateArrayOfType = validateArrayOfType;
    exports.validateOptional = validateOptional;
    exports.validateOptionalType = validateOptionalType;
    exports.validateType = validateType;
    var _is = require_is();
    var _validate = require_validate();
    var VISITOR_KEYS = exports.VISITOR_KEYS = {};
    var ALIAS_KEYS = exports.ALIAS_KEYS = {};
    var FLIPPED_ALIAS_KEYS = exports.FLIPPED_ALIAS_KEYS = {};
    var NODE_FIELDS = exports.NODE_FIELDS = {};
    var BUILDER_KEYS = exports.BUILDER_KEYS = {};
    var DEPRECATED_KEYS = exports.DEPRECATED_KEYS = {};
    var NODE_PARENT_VALIDATIONS = exports.NODE_PARENT_VALIDATIONS = {};
    function getType(val) {
      if (Array.isArray(val)) {
        return "array";
      } else if (val === null) {
        return "null";
      } else {
        return typeof val;
      }
    }
    function validate(validate2) {
      return {
        validate: validate2
      };
    }
    function typeIs(typeName) {
      return typeof typeName === "string" ? assertNodeType(typeName) : assertNodeType(...typeName);
    }
    function validateType(typeName) {
      return validate(typeIs(typeName));
    }
    function validateOptional(validate2) {
      return {
        validate: validate2,
        optional: true
      };
    }
    function validateOptionalType(typeName) {
      return {
        validate: typeIs(typeName),
        optional: true
      };
    }
    function arrayOf(elementType) {
      return chain(assertValueType("array"), assertEach(elementType));
    }
    function arrayOfType(typeName) {
      return arrayOf(typeIs(typeName));
    }
    function validateArrayOfType(typeName) {
      return validate(arrayOfType(typeName));
    }
    function assertEach(callback) {
      function validator(node, key, val) {
        if (!Array.isArray(val)) return;
        for (let i = 0; i < val.length; i++) {
          const subkey = `${key}[${i}]`;
          const v = val[i];
          callback(node, subkey, v);
          if (process.env.BABEL_TYPES_8_BREAKING) (0, _validate.validateChild)(node, subkey, v);
        }
      }
      validator.each = callback;
      return validator;
    }
    function assertOneOf(...values) {
      function validate2(node, key, val) {
        if (!values.includes(val)) {
          throw new TypeError(`Property ${key} expected value to be one of ${JSON.stringify(values)} but got ${JSON.stringify(val)}`);
        }
      }
      validate2.oneOf = values;
      return validate2;
    }
    function assertNodeType(...types) {
      function validate2(node, key, val) {
        for (const type of types) {
          if ((0, _is.default)(type, val)) {
            (0, _validate.validateChild)(node, key, val);
            return;
          }
        }
        throw new TypeError(`Property ${key} of ${node.type} expected node to be of a type ${JSON.stringify(types)} but instead got ${JSON.stringify(val == null ? void 0 : val.type)}`);
      }
      validate2.oneOfNodeTypes = types;
      return validate2;
    }
    function assertNodeOrValueType(...types) {
      function validate2(node, key, val) {
        for (const type of types) {
          if (getType(val) === type || (0, _is.default)(type, val)) {
            (0, _validate.validateChild)(node, key, val);
            return;
          }
        }
        throw new TypeError(`Property ${key} of ${node.type} expected node to be of a type ${JSON.stringify(types)} but instead got ${JSON.stringify(val == null ? void 0 : val.type)}`);
      }
      validate2.oneOfNodeOrValueTypes = types;
      return validate2;
    }
    function assertValueType(type) {
      function validate2(node, key, val) {
        const valid = getType(val) === type;
        if (!valid) {
          throw new TypeError(`Property ${key} expected type of ${type} but got ${getType(val)}`);
        }
      }
      validate2.type = type;
      return validate2;
    }
    function assertShape(shape) {
      function validate2(node, key, val) {
        const errors = [];
        for (const property of Object.keys(shape)) {
          try {
            (0, _validate.validateField)(node, property, val[property], shape[property]);
          } catch (error) {
            if (error instanceof TypeError) {
              errors.push(error.message);
              continue;
            }
            throw error;
          }
        }
        if (errors.length) {
          throw new TypeError(`Property ${key} of ${node.type} expected to have the following:
${errors.join("\n")}`);
        }
      }
      validate2.shapeOf = shape;
      return validate2;
    }
    function assertOptionalChainStart() {
      function validate2(node) {
        var _current;
        let current = node;
        while (node) {
          const {
            type
          } = current;
          if (type === "OptionalCallExpression") {
            if (current.optional) return;
            current = current.callee;
            continue;
          }
          if (type === "OptionalMemberExpression") {
            if (current.optional) return;
            current = current.object;
            continue;
          }
          break;
        }
        throw new TypeError(`Non-optional ${node.type} must chain from an optional OptionalMemberExpression or OptionalCallExpression. Found chain from ${(_current = current) == null ? void 0 : _current.type}`);
      }
      return validate2;
    }
    function chain(...fns) {
      function validate2(...args) {
        for (const fn of fns) {
          fn(...args);
        }
      }
      validate2.chainOf = fns;
      if (fns.length >= 2 && "type" in fns[0] && fns[0].type === "array" && !("each" in fns[1])) {
        throw new Error(`An assertValueType("array") validator can only be followed by an assertEach(...) validator.`);
      }
      return validate2;
    }
    var validTypeOpts = ["aliases", "builder", "deprecatedAlias", "fields", "inherits", "visitor", "validate"];
    var validFieldKeys = ["default", "optional", "deprecated", "validate"];
    var store = {};
    function defineAliasedType(...aliases) {
      return (type, opts = {}) => {
        let defined = opts.aliases;
        if (!defined) {
          var _store$opts$inherits$, _defined;
          if (opts.inherits) defined = (_store$opts$inherits$ = store[opts.inherits].aliases) == null ? void 0 : _store$opts$inherits$.slice();
          (_defined = defined) != null ? _defined : defined = [];
          opts.aliases = defined;
        }
        const additional = aliases.filter((a) => !defined.includes(a));
        defined.unshift(...additional);
        defineType(type, opts);
      };
    }
    function defineType(type, opts = {}) {
      const inherits = opts.inherits && store[opts.inherits] || {};
      let fields = opts.fields;
      if (!fields) {
        fields = {};
        if (inherits.fields) {
          const keys = Object.getOwnPropertyNames(inherits.fields);
          for (const key of keys) {
            const field = inherits.fields[key];
            const def = field.default;
            if (Array.isArray(def) ? def.length > 0 : def && typeof def === "object") {
              throw new Error("field defaults can only be primitives or empty arrays currently");
            }
            fields[key] = {
              default: Array.isArray(def) ? [] : def,
              optional: field.optional,
              deprecated: field.deprecated,
              validate: field.validate
            };
          }
        }
      }
      const visitor = opts.visitor || inherits.visitor || [];
      const aliases = opts.aliases || inherits.aliases || [];
      const builder = opts.builder || inherits.builder || opts.visitor || [];
      for (const k of Object.keys(opts)) {
        if (!validTypeOpts.includes(k)) {
          throw new Error(`Unknown type option "${k}" on ${type}`);
        }
      }
      if (opts.deprecatedAlias) {
        DEPRECATED_KEYS[opts.deprecatedAlias] = type;
      }
      for (const key of visitor.concat(builder)) {
        fields[key] = fields[key] || {};
      }
      for (const key of Object.keys(fields)) {
        const field = fields[key];
        if (field.default !== void 0 && !builder.includes(key)) {
          field.optional = true;
        }
        if (field.default === void 0) {
          field.default = null;
        } else if (!field.validate && field.default != null) {
          field.validate = assertValueType(getType(field.default));
        }
        for (const k of Object.keys(field)) {
          if (!validFieldKeys.includes(k)) {
            throw new Error(`Unknown field key "${k}" on ${type}.${key}`);
          }
        }
      }
      VISITOR_KEYS[type] = opts.visitor = visitor;
      BUILDER_KEYS[type] = opts.builder = builder;
      NODE_FIELDS[type] = opts.fields = fields;
      ALIAS_KEYS[type] = opts.aliases = aliases;
      aliases.forEach((alias) => {
        FLIPPED_ALIAS_KEYS[alias] = FLIPPED_ALIAS_KEYS[alias] || [];
        FLIPPED_ALIAS_KEYS[alias].push(type);
      });
      if (opts.validate) {
        NODE_PARENT_VALIDATIONS[type] = opts.validate;
      }
      store[type] = opts;
    }
  }
});

// node_modules/@babel/types/lib/definitions/core.js
var require_core = __commonJS({
  "node_modules/@babel/types/lib/definitions/core.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.patternLikeCommon = exports.functionTypeAnnotationCommon = exports.functionDeclarationCommon = exports.functionCommon = exports.classMethodOrPropertyCommon = exports.classMethodOrDeclareMethodCommon = void 0;
    var _is = require_is();
    var _isValidIdentifier = require_isValidIdentifier();
    var _helperValidatorIdentifier = require_lib();
    var _helperStringParser = require_lib2();
    var _index = require_constants();
    var _utils = require_utils();
    var defineType = (0, _utils.defineAliasedType)("Standardized");
    defineType("ArrayExpression", {
      fields: {
        elements: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeOrValueType)("null", "Expression", "SpreadElement"))),
          default: !process.env.BABEL_TYPES_8_BREAKING ? [] : void 0
        }
      },
      visitor: ["elements"],
      aliases: ["Expression"]
    });
    defineType("AssignmentExpression", {
      fields: {
        operator: {
          validate: function() {
            if (!process.env.BABEL_TYPES_8_BREAKING) {
              return (0, _utils.assertValueType)("string");
            }
            const identifier = (0, _utils.assertOneOf)(..._index.ASSIGNMENT_OPERATORS);
            const pattern = (0, _utils.assertOneOf)("=");
            return function(node, key, val) {
              const validator = (0, _is.default)("Pattern", node.left) ? pattern : identifier;
              validator(node, key, val);
            };
          }()
        },
        left: {
          validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("LVal", "OptionalMemberExpression") : (0, _utils.assertNodeType)("Identifier", "MemberExpression", "OptionalMemberExpression", "ArrayPattern", "ObjectPattern", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression")
        },
        right: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      },
      builder: ["operator", "left", "right"],
      visitor: ["left", "right"],
      aliases: ["Expression"]
    });
    defineType("BinaryExpression", {
      builder: ["operator", "left", "right"],
      fields: {
        operator: {
          validate: (0, _utils.assertOneOf)(..._index.BINARY_OPERATORS)
        },
        left: {
          validate: function() {
            const expression = (0, _utils.assertNodeType)("Expression");
            const inOp = (0, _utils.assertNodeType)("Expression", "PrivateName");
            const validator = Object.assign(function(node, key, val) {
              const validator2 = node.operator === "in" ? inOp : expression;
              validator2(node, key, val);
            }, {
              oneOfNodeTypes: ["Expression", "PrivateName"]
            });
            return validator;
          }()
        },
        right: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      },
      visitor: ["left", "right"],
      aliases: ["Binary", "Expression"]
    });
    defineType("InterpreterDirective", {
      builder: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("string")
        }
      }
    });
    defineType("Directive", {
      visitor: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertNodeType)("DirectiveLiteral")
        }
      }
    });
    defineType("DirectiveLiteral", {
      builder: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("string")
        }
      }
    });
    defineType("BlockStatement", {
      builder: ["body", "directives"],
      visitor: ["directives", "body"],
      fields: {
        directives: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Directive"))),
          default: []
        },
        body: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Statement")))
        }
      },
      aliases: ["Scopable", "BlockParent", "Block", "Statement"]
    });
    defineType("BreakStatement", {
      visitor: ["label"],
      fields: {
        label: {
          validate: (0, _utils.assertNodeType)("Identifier"),
          optional: true
        }
      },
      aliases: ["Statement", "Terminatorless", "CompletionStatement"]
    });
    defineType("CallExpression", {
      visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
      builder: ["callee", "arguments"],
      aliases: ["Expression"],
      fields: Object.assign({
        callee: {
          validate: (0, _utils.assertNodeType)("Expression", "Super", "V8IntrinsicIdentifier")
        },
        arguments: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression", "SpreadElement", "ArgumentPlaceholder")))
        }
      }, !process.env.BABEL_TYPES_8_BREAKING ? {
        optional: {
          validate: (0, _utils.assertOneOf)(true, false),
          optional: true
        }
      } : {}, {
        typeArguments: {
          validate: (0, _utils.assertNodeType)("TypeParameterInstantiation"),
          optional: true
        },
        typeParameters: {
          validate: (0, _utils.assertNodeType)("TSTypeParameterInstantiation"),
          optional: true
        }
      })
    });
    defineType("CatchClause", {
      visitor: ["param", "body"],
      fields: {
        param: {
          validate: (0, _utils.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern"),
          optional: true
        },
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement")
        }
      },
      aliases: ["Scopable", "BlockParent"]
    });
    defineType("ConditionalExpression", {
      visitor: ["test", "consequent", "alternate"],
      fields: {
        test: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        consequent: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        alternate: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      },
      aliases: ["Expression", "Conditional"]
    });
    defineType("ContinueStatement", {
      visitor: ["label"],
      fields: {
        label: {
          validate: (0, _utils.assertNodeType)("Identifier"),
          optional: true
        }
      },
      aliases: ["Statement", "Terminatorless", "CompletionStatement"]
    });
    defineType("DebuggerStatement", {
      aliases: ["Statement"]
    });
    defineType("DoWhileStatement", {
      visitor: ["test", "body"],
      fields: {
        test: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        body: {
          validate: (0, _utils.assertNodeType)("Statement")
        }
      },
      aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
    });
    defineType("EmptyStatement", {
      aliases: ["Statement"]
    });
    defineType("ExpressionStatement", {
      visitor: ["expression"],
      fields: {
        expression: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      },
      aliases: ["Statement", "ExpressionWrapper"]
    });
    defineType("File", {
      builder: ["program", "comments", "tokens"],
      visitor: ["program"],
      fields: {
        program: {
          validate: (0, _utils.assertNodeType)("Program")
        },
        comments: {
          validate: !process.env.BABEL_TYPES_8_BREAKING ? Object.assign(() => {
          }, {
            each: {
              oneOfNodeTypes: ["CommentBlock", "CommentLine"]
            }
          }) : (0, _utils.assertEach)((0, _utils.assertNodeType)("CommentBlock", "CommentLine")),
          optional: true
        },
        tokens: {
          validate: (0, _utils.assertEach)(Object.assign(() => {
          }, {
            type: "any"
          })),
          optional: true
        }
      }
    });
    defineType("ForInStatement", {
      visitor: ["left", "right", "body"],
      aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
      fields: {
        left: {
          validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("VariableDeclaration", "LVal") : (0, _utils.assertNodeType)("VariableDeclaration", "Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression")
        },
        right: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        body: {
          validate: (0, _utils.assertNodeType)("Statement")
        }
      }
    });
    defineType("ForStatement", {
      visitor: ["init", "test", "update", "body"],
      aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop"],
      fields: {
        init: {
          validate: (0, _utils.assertNodeType)("VariableDeclaration", "Expression"),
          optional: true
        },
        test: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        },
        update: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        },
        body: {
          validate: (0, _utils.assertNodeType)("Statement")
        }
      }
    });
    var functionCommon = () => ({
      params: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Identifier", "Pattern", "RestElement")))
      },
      generator: {
        default: false
      },
      async: {
        default: false
      }
    });
    exports.functionCommon = functionCommon;
    var functionTypeAnnotationCommon = () => ({
      returnType: {
        validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
        optional: true
      },
      typeParameters: {
        validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
        optional: true
      }
    });
    exports.functionTypeAnnotationCommon = functionTypeAnnotationCommon;
    var functionDeclarationCommon = () => Object.assign({}, functionCommon(), {
      declare: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: true
      },
      id: {
        validate: (0, _utils.assertNodeType)("Identifier"),
        optional: true
      }
    });
    exports.functionDeclarationCommon = functionDeclarationCommon;
    defineType("FunctionDeclaration", {
      builder: ["id", "params", "body", "generator", "async"],
      visitor: ["id", "params", "body", "returnType", "typeParameters"],
      fields: Object.assign({}, functionDeclarationCommon(), functionTypeAnnotationCommon(), {
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement")
        },
        predicate: {
          validate: (0, _utils.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
          optional: true
        }
      }),
      aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Statement", "Pureish", "Declaration"],
      validate: function() {
        if (!process.env.BABEL_TYPES_8_BREAKING) return () => {
        };
        const identifier = (0, _utils.assertNodeType)("Identifier");
        return function(parent, key, node) {
          if (!(0, _is.default)("ExportDefaultDeclaration", parent)) {
            identifier(node, "id", node.id);
          }
        };
      }()
    });
    defineType("FunctionExpression", {
      inherits: "FunctionDeclaration",
      aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish"],
      fields: Object.assign({}, functionCommon(), functionTypeAnnotationCommon(), {
        id: {
          validate: (0, _utils.assertNodeType)("Identifier"),
          optional: true
        },
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement")
        },
        predicate: {
          validate: (0, _utils.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
          optional: true
        }
      })
    });
    var patternLikeCommon = () => ({
      typeAnnotation: {
        validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
        optional: true
      },
      optional: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: true
      },
      decorators: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
        optional: true
      }
    });
    exports.patternLikeCommon = patternLikeCommon;
    defineType("Identifier", {
      builder: ["name"],
      visitor: ["typeAnnotation", "decorators"],
      aliases: ["Expression", "PatternLike", "LVal", "TSEntityName"],
      fields: Object.assign({}, patternLikeCommon(), {
        name: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), Object.assign(function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING) return;
            if (!(0, _isValidIdentifier.default)(val, false)) {
              throw new TypeError(`"${val}" is not a valid identifier name`);
            }
          }, {
            type: "string"
          }))
        }
      }),
      validate(parent, key, node) {
        if (!process.env.BABEL_TYPES_8_BREAKING) return;
        const match = /\.(\w+)$/.exec(key);
        if (!match) return;
        const [, parentKey] = match;
        const nonComp = {
          computed: false
        };
        if (parentKey === "property") {
          if ((0, _is.default)("MemberExpression", parent, nonComp)) return;
          if ((0, _is.default)("OptionalMemberExpression", parent, nonComp)) return;
        } else if (parentKey === "key") {
          if ((0, _is.default)("Property", parent, nonComp)) return;
          if ((0, _is.default)("Method", parent, nonComp)) return;
        } else if (parentKey === "exported") {
          if ((0, _is.default)("ExportSpecifier", parent)) return;
        } else if (parentKey === "imported") {
          if ((0, _is.default)("ImportSpecifier", parent, {
            imported: node
          })) return;
        } else if (parentKey === "meta") {
          if ((0, _is.default)("MetaProperty", parent, {
            meta: node
          })) return;
        }
        if (((0, _helperValidatorIdentifier.isKeyword)(node.name) || (0, _helperValidatorIdentifier.isReservedWord)(node.name, false)) && node.name !== "this") {
          throw new TypeError(`"${node.name}" is not a valid identifier`);
        }
      }
    });
    defineType("IfStatement", {
      visitor: ["test", "consequent", "alternate"],
      aliases: ["Statement", "Conditional"],
      fields: {
        test: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        consequent: {
          validate: (0, _utils.assertNodeType)("Statement")
        },
        alternate: {
          optional: true,
          validate: (0, _utils.assertNodeType)("Statement")
        }
      }
    });
    defineType("LabeledStatement", {
      visitor: ["label", "body"],
      aliases: ["Statement"],
      fields: {
        label: {
          validate: (0, _utils.assertNodeType)("Identifier")
        },
        body: {
          validate: (0, _utils.assertNodeType)("Statement")
        }
      }
    });
    defineType("StringLiteral", {
      builder: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("string")
        }
      },
      aliases: ["Expression", "Pureish", "Literal", "Immutable"]
    });
    defineType("NumericLiteral", {
      builder: ["value"],
      deprecatedAlias: "NumberLiteral",
      fields: {
        value: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("number"), Object.assign(function(node, key, val) {
            if (1 / val < 0 || !Number.isFinite(val)) {
              const error = new Error(`NumericLiterals must be non-negative finite numbers. You can use t.valueToNode(${val}) instead.`);
              {
              }
            }
          }, {
            type: "number"
          }))
        }
      },
      aliases: ["Expression", "Pureish", "Literal", "Immutable"]
    });
    defineType("NullLiteral", {
      aliases: ["Expression", "Pureish", "Literal", "Immutable"]
    });
    defineType("BooleanLiteral", {
      builder: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("boolean")
        }
      },
      aliases: ["Expression", "Pureish", "Literal", "Immutable"]
    });
    defineType("RegExpLiteral", {
      builder: ["pattern", "flags"],
      deprecatedAlias: "RegexLiteral",
      aliases: ["Expression", "Pureish", "Literal"],
      fields: {
        pattern: {
          validate: (0, _utils.assertValueType)("string")
        },
        flags: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), Object.assign(function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING) return;
            const invalid = /[^gimsuy]/.exec(val);
            if (invalid) {
              throw new TypeError(`"${invalid[0]}" is not a valid RegExp flag`);
            }
          }, {
            type: "string"
          })),
          default: ""
        }
      }
    });
    defineType("LogicalExpression", {
      builder: ["operator", "left", "right"],
      visitor: ["left", "right"],
      aliases: ["Binary", "Expression"],
      fields: {
        operator: {
          validate: (0, _utils.assertOneOf)(..._index.LOGICAL_OPERATORS)
        },
        left: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        right: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("MemberExpression", {
      builder: ["object", "property", "computed", ...!process.env.BABEL_TYPES_8_BREAKING ? ["optional"] : []],
      visitor: ["object", "property"],
      aliases: ["Expression", "LVal"],
      fields: Object.assign({
        object: {
          validate: (0, _utils.assertNodeType)("Expression", "Super")
        },
        property: {
          validate: function() {
            const normal = (0, _utils.assertNodeType)("Identifier", "PrivateName");
            const computed = (0, _utils.assertNodeType)("Expression");
            const validator = function(node, key, val) {
              const validator2 = node.computed ? computed : normal;
              validator2(node, key, val);
            };
            validator.oneOfNodeTypes = ["Expression", "Identifier", "PrivateName"];
            return validator;
          }()
        },
        computed: {
          default: false
        }
      }, !process.env.BABEL_TYPES_8_BREAKING ? {
        optional: {
          validate: (0, _utils.assertOneOf)(true, false),
          optional: true
        }
      } : {})
    });
    defineType("NewExpression", {
      inherits: "CallExpression"
    });
    defineType("Program", {
      visitor: ["directives", "body"],
      builder: ["body", "directives", "sourceType", "interpreter"],
      fields: {
        sourceType: {
          validate: (0, _utils.assertOneOf)("script", "module"),
          default: "script"
        },
        interpreter: {
          validate: (0, _utils.assertNodeType)("InterpreterDirective"),
          default: null,
          optional: true
        },
        directives: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Directive"))),
          default: []
        },
        body: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Statement")))
        }
      },
      aliases: ["Scopable", "BlockParent", "Block"]
    });
    defineType("ObjectExpression", {
      visitor: ["properties"],
      aliases: ["Expression"],
      fields: {
        properties: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ObjectMethod", "ObjectProperty", "SpreadElement")))
        }
      }
    });
    defineType("ObjectMethod", {
      builder: ["kind", "key", "params", "body", "computed", "generator", "async"],
      fields: Object.assign({}, functionCommon(), functionTypeAnnotationCommon(), {
        kind: Object.assign({
          validate: (0, _utils.assertOneOf)("method", "get", "set")
        }, !process.env.BABEL_TYPES_8_BREAKING ? {
          default: "method"
        } : {}),
        computed: {
          default: false
        },
        key: {
          validate: function() {
            const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral");
            const computed = (0, _utils.assertNodeType)("Expression");
            const validator = function(node, key, val) {
              const validator2 = node.computed ? computed : normal;
              validator2(node, key, val);
            };
            validator.oneOfNodeTypes = ["Expression", "Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral"];
            return validator;
          }()
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        },
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement")
        }
      }),
      visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
      aliases: ["UserWhitespacable", "Function", "Scopable", "BlockParent", "FunctionParent", "Method", "ObjectMember"]
    });
    defineType("ObjectProperty", {
      builder: ["key", "value", "computed", "shorthand", ...!process.env.BABEL_TYPES_8_BREAKING ? ["decorators"] : []],
      fields: {
        computed: {
          default: false
        },
        key: {
          validate: function() {
            const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "DecimalLiteral", "PrivateName");
            const computed = (0, _utils.assertNodeType)("Expression");
            const validator = Object.assign(function(node, key, val) {
              const validator2 = node.computed ? computed : normal;
              validator2(node, key, val);
            }, {
              oneOfNodeTypes: ["Expression", "Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "DecimalLiteral", "PrivateName"]
            });
            return validator;
          }()
        },
        value: {
          validate: (0, _utils.assertNodeType)("Expression", "PatternLike")
        },
        shorthand: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("boolean"), Object.assign(function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING) return;
            if (val && node.computed) {
              throw new TypeError("Property shorthand of ObjectProperty cannot be true if computed is true");
            }
          }, {
            type: "boolean"
          }), function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING) return;
            if (val && !(0, _is.default)("Identifier", node.key)) {
              throw new TypeError("Property shorthand of ObjectProperty cannot be true if key is not an Identifier");
            }
          }),
          default: false
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        }
      },
      visitor: ["key", "value", "decorators"],
      aliases: ["UserWhitespacable", "Property", "ObjectMember"],
      validate: function() {
        const pattern = (0, _utils.assertNodeType)("Identifier", "Pattern", "TSAsExpression", "TSSatisfiesExpression", "TSNonNullExpression", "TSTypeAssertion");
        const expression = (0, _utils.assertNodeType)("Expression");
        return function(parent, key, node) {
          if (!process.env.BABEL_TYPES_8_BREAKING) return;
          const validator = (0, _is.default)("ObjectPattern", parent) ? pattern : expression;
          validator(node, "value", node.value);
        };
      }()
    });
    defineType("RestElement", {
      visitor: ["argument", "typeAnnotation"],
      builder: ["argument"],
      aliases: ["LVal", "PatternLike"],
      deprecatedAlias: "RestProperty",
      fields: Object.assign({}, patternLikeCommon(), {
        argument: {
          validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("LVal") : (0, _utils.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern", "MemberExpression", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression")
        }
      }),
      validate(parent, key) {
        if (!process.env.BABEL_TYPES_8_BREAKING) return;
        const match = /(\w+)\[(\d+)\]/.exec(key);
        if (!match) throw new Error("Internal Babel error: malformed key.");
        const [, listKey, index] = match;
        if (parent[listKey].length > +index + 1) {
          throw new TypeError(`RestElement must be last element of ${listKey}`);
        }
      }
    });
    defineType("ReturnStatement", {
      visitor: ["argument"],
      aliases: ["Statement", "Terminatorless", "CompletionStatement"],
      fields: {
        argument: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        }
      }
    });
    defineType("SequenceExpression", {
      visitor: ["expressions"],
      fields: {
        expressions: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression")))
        }
      },
      aliases: ["Expression"]
    });
    defineType("ParenthesizedExpression", {
      visitor: ["expression"],
      aliases: ["Expression", "ExpressionWrapper"],
      fields: {
        expression: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("SwitchCase", {
      visitor: ["test", "consequent"],
      fields: {
        test: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        },
        consequent: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Statement")))
        }
      }
    });
    defineType("SwitchStatement", {
      visitor: ["discriminant", "cases"],
      aliases: ["Statement", "BlockParent", "Scopable"],
      fields: {
        discriminant: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        cases: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("SwitchCase")))
        }
      }
    });
    defineType("ThisExpression", {
      aliases: ["Expression"]
    });
    defineType("ThrowStatement", {
      visitor: ["argument"],
      aliases: ["Statement", "Terminatorless", "CompletionStatement"],
      fields: {
        argument: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("TryStatement", {
      visitor: ["block", "handler", "finalizer"],
      aliases: ["Statement"],
      fields: {
        block: {
          validate: (0, _utils.chain)((0, _utils.assertNodeType)("BlockStatement"), Object.assign(function(node) {
            if (!process.env.BABEL_TYPES_8_BREAKING) return;
            if (!node.handler && !node.finalizer) {
              throw new TypeError("TryStatement expects either a handler or finalizer, or both");
            }
          }, {
            oneOfNodeTypes: ["BlockStatement"]
          }))
        },
        handler: {
          optional: true,
          validate: (0, _utils.assertNodeType)("CatchClause")
        },
        finalizer: {
          optional: true,
          validate: (0, _utils.assertNodeType)("BlockStatement")
        }
      }
    });
    defineType("UnaryExpression", {
      builder: ["operator", "argument", "prefix"],
      fields: {
        prefix: {
          default: true
        },
        argument: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        operator: {
          validate: (0, _utils.assertOneOf)(..._index.UNARY_OPERATORS)
        }
      },
      visitor: ["argument"],
      aliases: ["UnaryLike", "Expression"]
    });
    defineType("UpdateExpression", {
      builder: ["operator", "argument", "prefix"],
      fields: {
        prefix: {
          default: false
        },
        argument: {
          validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("Expression") : (0, _utils.assertNodeType)("Identifier", "MemberExpression")
        },
        operator: {
          validate: (0, _utils.assertOneOf)(..._index.UPDATE_OPERATORS)
        }
      },
      visitor: ["argument"],
      aliases: ["Expression"]
    });
    defineType("VariableDeclaration", {
      builder: ["kind", "declarations"],
      visitor: ["declarations"],
      aliases: ["Statement", "Declaration"],
      fields: {
        declare: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        kind: {
          validate: (0, _utils.assertOneOf)("var", "let", "const", "using", "await using")
        },
        declarations: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("VariableDeclarator")))
        }
      },
      validate(parent, key, node) {
        if (!process.env.BABEL_TYPES_8_BREAKING) return;
        if (!(0, _is.default)("ForXStatement", parent, {
          left: node
        })) return;
        if (node.declarations.length !== 1) {
          throw new TypeError(`Exactly one VariableDeclarator is required in the VariableDeclaration of a ${parent.type}`);
        }
      }
    });
    defineType("VariableDeclarator", {
      visitor: ["id", "init"],
      fields: {
        id: {
          validate: function() {
            if (!process.env.BABEL_TYPES_8_BREAKING) {
              return (0, _utils.assertNodeType)("LVal");
            }
            const normal = (0, _utils.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern");
            const without = (0, _utils.assertNodeType)("Identifier");
            return function(node, key, val) {
              const validator = node.init ? normal : without;
              validator(node, key, val);
            };
          }()
        },
        definite: {
          optional: true,
          validate: (0, _utils.assertValueType)("boolean")
        },
        init: {
          optional: true,
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("WhileStatement", {
      visitor: ["test", "body"],
      aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"],
      fields: {
        test: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        body: {
          validate: (0, _utils.assertNodeType)("Statement")
        }
      }
    });
    defineType("WithStatement", {
      visitor: ["object", "body"],
      aliases: ["Statement"],
      fields: {
        object: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        body: {
          validate: (0, _utils.assertNodeType)("Statement")
        }
      }
    });
    defineType("AssignmentPattern", {
      visitor: ["left", "right", "decorators"],
      builder: ["left", "right"],
      aliases: ["Pattern", "PatternLike", "LVal"],
      fields: Object.assign({}, patternLikeCommon(), {
        left: {
          validate: (0, _utils.assertNodeType)("Identifier", "ObjectPattern", "ArrayPattern", "MemberExpression", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression")
        },
        right: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        }
      })
    });
    defineType("ArrayPattern", {
      visitor: ["elements", "typeAnnotation"],
      builder: ["elements"],
      aliases: ["Pattern", "PatternLike", "LVal"],
      fields: Object.assign({}, patternLikeCommon(), {
        elements: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeOrValueType)("null", "PatternLike", "LVal")))
        }
      })
    });
    defineType("ArrowFunctionExpression", {
      builder: ["params", "body", "async"],
      visitor: ["params", "body", "returnType", "typeParameters"],
      aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish"],
      fields: Object.assign({}, functionCommon(), functionTypeAnnotationCommon(), {
        expression: {
          validate: (0, _utils.assertValueType)("boolean")
        },
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement", "Expression")
        },
        predicate: {
          validate: (0, _utils.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
          optional: true
        }
      })
    });
    defineType("ClassBody", {
      visitor: ["body"],
      fields: {
        body: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ClassMethod", "ClassPrivateMethod", "ClassProperty", "ClassPrivateProperty", "ClassAccessorProperty", "TSDeclareMethod", "TSIndexSignature", "StaticBlock")))
        }
      }
    });
    defineType("ClassExpression", {
      builder: ["id", "superClass", "body", "decorators"],
      visitor: ["id", "body", "superClass", "mixins", "typeParameters", "superTypeParameters", "implements", "decorators"],
      aliases: ["Scopable", "Class", "Expression"],
      fields: {
        id: {
          validate: (0, _utils.assertNodeType)("Identifier"),
          optional: true
        },
        typeParameters: {
          validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
          optional: true
        },
        body: {
          validate: (0, _utils.assertNodeType)("ClassBody")
        },
        superClass: {
          optional: true,
          validate: (0, _utils.assertNodeType)("Expression")
        },
        superTypeParameters: {
          validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
          optional: true
        },
        implements: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSExpressionWithTypeArguments", "ClassImplements"))),
          optional: true
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        },
        mixins: {
          validate: (0, _utils.assertNodeType)("InterfaceExtends"),
          optional: true
        }
      }
    });
    defineType("ClassDeclaration", {
      inherits: "ClassExpression",
      aliases: ["Scopable", "Class", "Statement", "Declaration"],
      fields: {
        id: {
          validate: (0, _utils.assertNodeType)("Identifier"),
          optional: true
        },
        typeParameters: {
          validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
          optional: true
        },
        body: {
          validate: (0, _utils.assertNodeType)("ClassBody")
        },
        superClass: {
          optional: true,
          validate: (0, _utils.assertNodeType)("Expression")
        },
        superTypeParameters: {
          validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
          optional: true
        },
        implements: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSExpressionWithTypeArguments", "ClassImplements"))),
          optional: true
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        },
        mixins: {
          validate: (0, _utils.assertNodeType)("InterfaceExtends"),
          optional: true
        },
        declare: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        abstract: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        }
      },
      validate: function() {
        const identifier = (0, _utils.assertNodeType)("Identifier");
        return function(parent, key, node) {
          if (!process.env.BABEL_TYPES_8_BREAKING) return;
          if (!(0, _is.default)("ExportDefaultDeclaration", parent)) {
            identifier(node, "id", node.id);
          }
        };
      }()
    });
    defineType("ExportAllDeclaration", {
      builder: ["source"],
      visitor: ["source", "attributes", "assertions"],
      aliases: ["Statement", "Declaration", "ImportOrExportDeclaration", "ExportDeclaration"],
      fields: {
        source: {
          validate: (0, _utils.assertNodeType)("StringLiteral")
        },
        exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("type", "value")),
        attributes: {
          optional: true,
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
        },
        assertions: {
          optional: true,
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
        }
      }
    });
    defineType("ExportDefaultDeclaration", {
      visitor: ["declaration"],
      aliases: ["Statement", "Declaration", "ImportOrExportDeclaration", "ExportDeclaration"],
      fields: {
        declaration: {
          validate: (0, _utils.assertNodeType)("TSDeclareFunction", "FunctionDeclaration", "ClassDeclaration", "Expression")
        },
        exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("value"))
      }
    });
    defineType("ExportNamedDeclaration", {
      builder: ["declaration", "specifiers", "source"],
      visitor: ["declaration", "specifiers", "source", "attributes", "assertions"],
      aliases: ["Statement", "Declaration", "ImportOrExportDeclaration", "ExportDeclaration"],
      fields: {
        declaration: {
          optional: true,
          validate: (0, _utils.chain)((0, _utils.assertNodeType)("Declaration"), Object.assign(function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING) return;
            if (val && node.specifiers.length) {
              throw new TypeError("Only declaration or specifiers is allowed on ExportNamedDeclaration");
            }
          }, {
            oneOfNodeTypes: ["Declaration"]
          }), function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING) return;
            if (val && node.source) {
              throw new TypeError("Cannot export a declaration from a source");
            }
          })
        },
        attributes: {
          optional: true,
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
        },
        assertions: {
          optional: true,
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
        },
        specifiers: {
          default: [],
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)(function() {
            const sourced = (0, _utils.assertNodeType)("ExportSpecifier", "ExportDefaultSpecifier", "ExportNamespaceSpecifier");
            const sourceless = (0, _utils.assertNodeType)("ExportSpecifier");
            if (!process.env.BABEL_TYPES_8_BREAKING) return sourced;
            return function(node, key, val) {
              const validator = node.source ? sourced : sourceless;
              validator(node, key, val);
            };
          }()))
        },
        source: {
          validate: (0, _utils.assertNodeType)("StringLiteral"),
          optional: true
        },
        exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("type", "value"))
      }
    });
    defineType("ExportSpecifier", {
      visitor: ["local", "exported"],
      aliases: ["ModuleSpecifier"],
      fields: {
        local: {
          validate: (0, _utils.assertNodeType)("Identifier")
        },
        exported: {
          validate: (0, _utils.assertNodeType)("Identifier", "StringLiteral")
        },
        exportKind: {
          validate: (0, _utils.assertOneOf)("type", "value"),
          optional: true
        }
      }
    });
    defineType("ForOfStatement", {
      visitor: ["left", "right", "body"],
      builder: ["left", "right", "body", "await"],
      aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
      fields: {
        left: {
          validate: function() {
            if (!process.env.BABEL_TYPES_8_BREAKING) {
              return (0, _utils.assertNodeType)("VariableDeclaration", "LVal");
            }
            const declaration = (0, _utils.assertNodeType)("VariableDeclaration");
            const lval = (0, _utils.assertNodeType)("Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression");
            return function(node, key, val) {
              if ((0, _is.default)("VariableDeclaration", val)) {
                declaration(node, key, val);
              } else {
                lval(node, key, val);
              }
            };
          }()
        },
        right: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        body: {
          validate: (0, _utils.assertNodeType)("Statement")
        },
        await: {
          default: false
        }
      }
    });
    defineType("ImportDeclaration", {
      builder: ["specifiers", "source"],
      visitor: ["specifiers", "source", "attributes", "assertions"],
      aliases: ["Statement", "Declaration", "ImportOrExportDeclaration"],
      fields: {
        attributes: {
          optional: true,
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
        },
        assertions: {
          optional: true,
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportAttribute")))
        },
        module: {
          optional: true,
          validate: (0, _utils.assertValueType)("boolean")
        },
        phase: {
          default: null,
          validate: (0, _utils.assertOneOf)("source", "defer")
        },
        specifiers: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ImportSpecifier", "ImportDefaultSpecifier", "ImportNamespaceSpecifier")))
        },
        source: {
          validate: (0, _utils.assertNodeType)("StringLiteral")
        },
        importKind: {
          validate: (0, _utils.assertOneOf)("type", "typeof", "value"),
          optional: true
        }
      }
    });
    defineType("ImportDefaultSpecifier", {
      visitor: ["local"],
      aliases: ["ModuleSpecifier"],
      fields: {
        local: {
          validate: (0, _utils.assertNodeType)("Identifier")
        }
      }
    });
    defineType("ImportNamespaceSpecifier", {
      visitor: ["local"],
      aliases: ["ModuleSpecifier"],
      fields: {
        local: {
          validate: (0, _utils.assertNodeType)("Identifier")
        }
      }
    });
    defineType("ImportSpecifier", {
      visitor: ["local", "imported"],
      aliases: ["ModuleSpecifier"],
      fields: {
        local: {
          validate: (0, _utils.assertNodeType)("Identifier")
        },
        imported: {
          validate: (0, _utils.assertNodeType)("Identifier", "StringLiteral")
        },
        importKind: {
          validate: (0, _utils.assertOneOf)("type", "typeof", "value"),
          optional: true
        }
      }
    });
    defineType("ImportExpression", {
      visitor: ["source", "options"],
      aliases: ["Expression"],
      fields: {
        phase: {
          default: null,
          validate: (0, _utils.assertOneOf)("source", "defer")
        },
        source: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        options: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        }
      }
    });
    defineType("MetaProperty", {
      visitor: ["meta", "property"],
      aliases: ["Expression"],
      fields: {
        meta: {
          validate: (0, _utils.chain)((0, _utils.assertNodeType)("Identifier"), Object.assign(function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING) return;
            let property;
            switch (val.name) {
              case "function":
                property = "sent";
                break;
              case "new":
                property = "target";
                break;
              case "import":
                property = "meta";
                break;
            }
            if (!(0, _is.default)("Identifier", node.property, {
              name: property
            })) {
              throw new TypeError("Unrecognised MetaProperty");
            }
          }, {
            oneOfNodeTypes: ["Identifier"]
          }))
        },
        property: {
          validate: (0, _utils.assertNodeType)("Identifier")
        }
      }
    });
    var classMethodOrPropertyCommon = () => ({
      abstract: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: true
      },
      accessibility: {
        validate: (0, _utils.assertOneOf)("public", "private", "protected"),
        optional: true
      },
      static: {
        default: false
      },
      override: {
        default: false
      },
      computed: {
        default: false
      },
      optional: {
        validate: (0, _utils.assertValueType)("boolean"),
        optional: true
      },
      key: {
        validate: (0, _utils.chain)(function() {
          const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral");
          const computed = (0, _utils.assertNodeType)("Expression");
          return function(node, key, val) {
            const validator = node.computed ? computed : normal;
            validator(node, key, val);
          };
        }(), (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "Expression"))
      }
    });
    exports.classMethodOrPropertyCommon = classMethodOrPropertyCommon;
    var classMethodOrDeclareMethodCommon = () => Object.assign({}, functionCommon(), classMethodOrPropertyCommon(), {
      params: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Identifier", "Pattern", "RestElement", "TSParameterProperty")))
      },
      kind: {
        validate: (0, _utils.assertOneOf)("get", "set", "method", "constructor"),
        default: "method"
      },
      access: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), (0, _utils.assertOneOf)("public", "private", "protected")),
        optional: true
      },
      decorators: {
        validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
        optional: true
      }
    });
    exports.classMethodOrDeclareMethodCommon = classMethodOrDeclareMethodCommon;
    defineType("ClassMethod", {
      aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method"],
      builder: ["kind", "key", "params", "body", "computed", "static", "generator", "async"],
      visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
      fields: Object.assign({}, classMethodOrDeclareMethodCommon(), functionTypeAnnotationCommon(), {
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement")
        }
      })
    });
    defineType("ObjectPattern", {
      visitor: ["properties", "typeAnnotation", "decorators"],
      builder: ["properties"],
      aliases: ["Pattern", "PatternLike", "LVal"],
      fields: Object.assign({}, patternLikeCommon(), {
        properties: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("RestElement", "ObjectProperty")))
        }
      })
    });
    defineType("SpreadElement", {
      visitor: ["argument"],
      aliases: ["UnaryLike"],
      deprecatedAlias: "SpreadProperty",
      fields: {
        argument: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("Super", {
      aliases: ["Expression"]
    });
    defineType("TaggedTemplateExpression", {
      visitor: ["tag", "quasi", "typeParameters"],
      builder: ["tag", "quasi"],
      aliases: ["Expression"],
      fields: {
        tag: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        quasi: {
          validate: (0, _utils.assertNodeType)("TemplateLiteral")
        },
        typeParameters: {
          validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
          optional: true
        }
      }
    });
    defineType("TemplateElement", {
      builder: ["value", "tail"],
      fields: {
        value: {
          validate: (0, _utils.chain)((0, _utils.assertShape)({
            raw: {
              validate: (0, _utils.assertValueType)("string")
            },
            cooked: {
              validate: (0, _utils.assertValueType)("string"),
              optional: true
            }
          }), function templateElementCookedValidator(node) {
            const raw = node.value.raw;
            let unterminatedCalled = false;
            const error = () => {
              throw new Error("Internal @babel/types error.");
            };
            const {
              str,
              firstInvalidLoc
            } = (0, _helperStringParser.readStringContents)("template", raw, 0, 0, 0, {
              unterminated() {
                unterminatedCalled = true;
              },
              strictNumericEscape: error,
              invalidEscapeSequence: error,
              numericSeparatorInEscapeSequence: error,
              unexpectedNumericSeparator: error,
              invalidDigit: error,
              invalidCodePoint: error
            });
            if (!unterminatedCalled) throw new Error("Invalid raw");
            node.value.cooked = firstInvalidLoc ? null : str;
          })
        },
        tail: {
          default: false
        }
      }
    });
    defineType("TemplateLiteral", {
      visitor: ["quasis", "expressions"],
      aliases: ["Expression", "Literal"],
      fields: {
        quasis: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TemplateElement")))
        },
        expressions: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression", "TSType")), function(node, key, val) {
            if (node.quasis.length !== val.length + 1) {
              throw new TypeError(`Number of ${node.type} quasis should be exactly one more than the number of expressions.
Expected ${val.length + 1} quasis but got ${node.quasis.length}`);
            }
          })
        }
      }
    });
    defineType("YieldExpression", {
      builder: ["argument", "delegate"],
      visitor: ["argument"],
      aliases: ["Expression", "Terminatorless"],
      fields: {
        delegate: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("boolean"), Object.assign(function(node, key, val) {
            if (!process.env.BABEL_TYPES_8_BREAKING) return;
            if (val && !node.argument) {
              throw new TypeError("Property delegate of YieldExpression cannot be true if there is no argument");
            }
          }, {
            type: "boolean"
          })),
          default: false
        },
        argument: {
          optional: true,
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("AwaitExpression", {
      builder: ["argument"],
      visitor: ["argument"],
      aliases: ["Expression", "Terminatorless"],
      fields: {
        argument: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("Import", {
      aliases: ["Expression"]
    });
    defineType("BigIntLiteral", {
      builder: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("string")
        }
      },
      aliases: ["Expression", "Pureish", "Literal", "Immutable"]
    });
    defineType("ExportNamespaceSpecifier", {
      visitor: ["exported"],
      aliases: ["ModuleSpecifier"],
      fields: {
        exported: {
          validate: (0, _utils.assertNodeType)("Identifier")
        }
      }
    });
    defineType("OptionalMemberExpression", {
      builder: ["object", "property", "computed", "optional"],
      visitor: ["object", "property"],
      aliases: ["Expression"],
      fields: {
        object: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        property: {
          validate: function() {
            const normal = (0, _utils.assertNodeType)("Identifier");
            const computed = (0, _utils.assertNodeType)("Expression");
            const validator = Object.assign(function(node, key, val) {
              const validator2 = node.computed ? computed : normal;
              validator2(node, key, val);
            }, {
              oneOfNodeTypes: ["Expression", "Identifier"]
            });
            return validator;
          }()
        },
        computed: {
          default: false
        },
        optional: {
          validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertValueType)("boolean") : (0, _utils.chain)((0, _utils.assertValueType)("boolean"), (0, _utils.assertOptionalChainStart)())
        }
      }
    });
    defineType("OptionalCallExpression", {
      visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
      builder: ["callee", "arguments", "optional"],
      aliases: ["Expression"],
      fields: {
        callee: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        arguments: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression", "SpreadElement", "ArgumentPlaceholder")))
        },
        optional: {
          validate: !process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertValueType)("boolean") : (0, _utils.chain)((0, _utils.assertValueType)("boolean"), (0, _utils.assertOptionalChainStart)())
        },
        typeArguments: {
          validate: (0, _utils.assertNodeType)("TypeParameterInstantiation"),
          optional: true
        },
        typeParameters: {
          validate: (0, _utils.assertNodeType)("TSTypeParameterInstantiation"),
          optional: true
        }
      }
    });
    defineType("ClassProperty", {
      visitor: ["key", "value", "typeAnnotation", "decorators"],
      builder: ["key", "value", "typeAnnotation", "decorators", "computed", "static"],
      aliases: ["Property"],
      fields: Object.assign({}, classMethodOrPropertyCommon(), {
        value: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        },
        definite: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        typeAnnotation: {
          validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
          optional: true
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        },
        readonly: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        declare: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        variance: {
          validate: (0, _utils.assertNodeType)("Variance"),
          optional: true
        }
      })
    });
    defineType("ClassAccessorProperty", {
      visitor: ["key", "value", "typeAnnotation", "decorators"],
      builder: ["key", "value", "typeAnnotation", "decorators", "computed", "static"],
      aliases: ["Property", "Accessor"],
      fields: Object.assign({}, classMethodOrPropertyCommon(), {
        key: {
          validate: (0, _utils.chain)(function() {
            const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "PrivateName");
            const computed = (0, _utils.assertNodeType)("Expression");
            return function(node, key, val) {
              const validator = node.computed ? computed : normal;
              validator(node, key, val);
            };
          }(), (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "Expression", "PrivateName"))
        },
        value: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        },
        definite: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        typeAnnotation: {
          validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
          optional: true
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        },
        readonly: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        declare: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        variance: {
          validate: (0, _utils.assertNodeType)("Variance"),
          optional: true
        }
      })
    });
    defineType("ClassPrivateProperty", {
      visitor: ["key", "value", "decorators", "typeAnnotation"],
      builder: ["key", "value", "decorators", "static"],
      aliases: ["Property", "Private"],
      fields: {
        key: {
          validate: (0, _utils.assertNodeType)("PrivateName")
        },
        value: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        },
        typeAnnotation: {
          validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
          optional: true
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        },
        static: {
          validate: (0, _utils.assertValueType)("boolean"),
          default: false
        },
        readonly: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        definite: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        variance: {
          validate: (0, _utils.assertNodeType)("Variance"),
          optional: true
        }
      }
    });
    defineType("ClassPrivateMethod", {
      builder: ["kind", "key", "params", "body", "static"],
      visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
      aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method", "Private"],
      fields: Object.assign({}, classMethodOrDeclareMethodCommon(), functionTypeAnnotationCommon(), {
        kind: {
          validate: (0, _utils.assertOneOf)("get", "set", "method"),
          default: "method"
        },
        key: {
          validate: (0, _utils.assertNodeType)("PrivateName")
        },
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement")
        }
      })
    });
    defineType("PrivateName", {
      visitor: ["id"],
      aliases: ["Private"],
      fields: {
        id: {
          validate: (0, _utils.assertNodeType)("Identifier")
        }
      }
    });
    defineType("StaticBlock", {
      visitor: ["body"],
      fields: {
        body: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Statement")))
        }
      },
      aliases: ["Scopable", "BlockParent", "FunctionParent"]
    });
  }
});

// node_modules/@babel/types/lib/definitions/flow.js
var require_flow = __commonJS({
  "node_modules/@babel/types/lib/definitions/flow.js"() {
    "use strict";
    var _utils = require_utils();
    var defineType = (0, _utils.defineAliasedType)("Flow");
    var defineInterfaceishType = (name) => {
      const isDeclareClass = name === "DeclareClass";
      defineType(name, {
        builder: ["id", "typeParameters", "extends", "body"],
        visitor: ["id", "typeParameters", "extends", ...isDeclareClass ? ["mixins", "implements"] : [], "body"],
        aliases: ["FlowDeclaration", "Statement", "Declaration"],
        fields: Object.assign({
          id: (0, _utils.validateType)("Identifier"),
          typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
          extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends"))
        }, isDeclareClass ? {
          mixins: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends")),
          implements: (0, _utils.validateOptional)((0, _utils.arrayOfType)("ClassImplements"))
        } : {}, {
          body: (0, _utils.validateType)("ObjectTypeAnnotation")
        })
      });
    };
    defineType("AnyTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("ArrayTypeAnnotation", {
      visitor: ["elementType"],
      aliases: ["FlowType"],
      fields: {
        elementType: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("BooleanTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("BooleanLiteralTypeAnnotation", {
      builder: ["value"],
      aliases: ["FlowType"],
      fields: {
        value: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("NullLiteralTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("ClassImplements", {
      visitor: ["id", "typeParameters"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
      }
    });
    defineInterfaceishType("DeclareClass");
    defineType("DeclareFunction", {
      visitor: ["id"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        predicate: (0, _utils.validateOptionalType)("DeclaredPredicate")
      }
    });
    defineInterfaceishType("DeclareInterface");
    defineType("DeclareModule", {
      builder: ["id", "body", "kind"],
      visitor: ["id", "body"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: (0, _utils.validateType)(["Identifier", "StringLiteral"]),
        body: (0, _utils.validateType)("BlockStatement"),
        kind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("CommonJS", "ES"))
      }
    });
    defineType("DeclareModuleExports", {
      visitor: ["typeAnnotation"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        typeAnnotation: (0, _utils.validateType)("TypeAnnotation")
      }
    });
    defineType("DeclareTypeAlias", {
      visitor: ["id", "typeParameters", "right"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
        right: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("DeclareOpaqueType", {
      visitor: ["id", "typeParameters", "supertype"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
        supertype: (0, _utils.validateOptionalType)("FlowType"),
        impltype: (0, _utils.validateOptionalType)("FlowType")
      }
    });
    defineType("DeclareVariable", {
      visitor: ["id"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: (0, _utils.validateType)("Identifier")
      }
    });
    defineType("DeclareExportDeclaration", {
      visitor: ["declaration", "specifiers", "source"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        declaration: (0, _utils.validateOptionalType)("Flow"),
        specifiers: (0, _utils.validateOptional)((0, _utils.arrayOfType)(["ExportSpecifier", "ExportNamespaceSpecifier"])),
        source: (0, _utils.validateOptionalType)("StringLiteral"),
        default: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("DeclareExportAllDeclaration", {
      visitor: ["source"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        source: (0, _utils.validateType)("StringLiteral"),
        exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("type", "value"))
      }
    });
    defineType("DeclaredPredicate", {
      visitor: ["value"],
      aliases: ["FlowPredicate"],
      fields: {
        value: (0, _utils.validateType)("Flow")
      }
    });
    defineType("ExistsTypeAnnotation", {
      aliases: ["FlowType"]
    });
    defineType("FunctionTypeAnnotation", {
      visitor: ["typeParameters", "params", "rest", "returnType"],
      aliases: ["FlowType"],
      fields: {
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
        params: (0, _utils.validate)((0, _utils.arrayOfType)("FunctionTypeParam")),
        rest: (0, _utils.validateOptionalType)("FunctionTypeParam"),
        this: (0, _utils.validateOptionalType)("FunctionTypeParam"),
        returnType: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("FunctionTypeParam", {
      visitor: ["name", "typeAnnotation"],
      fields: {
        name: (0, _utils.validateOptionalType)("Identifier"),
        typeAnnotation: (0, _utils.validateType)("FlowType"),
        optional: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("GenericTypeAnnotation", {
      visitor: ["id", "typeParameters"],
      aliases: ["FlowType"],
      fields: {
        id: (0, _utils.validateType)(["Identifier", "QualifiedTypeIdentifier"]),
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
      }
    });
    defineType("InferredPredicate", {
      aliases: ["FlowPredicate"]
    });
    defineType("InterfaceExtends", {
      visitor: ["id", "typeParameters"],
      fields: {
        id: (0, _utils.validateType)(["Identifier", "QualifiedTypeIdentifier"]),
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
      }
    });
    defineInterfaceishType("InterfaceDeclaration");
    defineType("InterfaceTypeAnnotation", {
      visitor: ["extends", "body"],
      aliases: ["FlowType"],
      fields: {
        extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends")),
        body: (0, _utils.validateType)("ObjectTypeAnnotation")
      }
    });
    defineType("IntersectionTypeAnnotation", {
      visitor: ["types"],
      aliases: ["FlowType"],
      fields: {
        types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
      }
    });
    defineType("MixedTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("EmptyTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("NullableTypeAnnotation", {
      visitor: ["typeAnnotation"],
      aliases: ["FlowType"],
      fields: {
        typeAnnotation: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("NumberLiteralTypeAnnotation", {
      builder: ["value"],
      aliases: ["FlowType"],
      fields: {
        value: (0, _utils.validate)((0, _utils.assertValueType)("number"))
      }
    });
    defineType("NumberTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("ObjectTypeAnnotation", {
      visitor: ["properties", "indexers", "callProperties", "internalSlots"],
      aliases: ["FlowType"],
      builder: ["properties", "indexers", "callProperties", "internalSlots", "exact"],
      fields: {
        properties: (0, _utils.validate)((0, _utils.arrayOfType)(["ObjectTypeProperty", "ObjectTypeSpreadProperty"])),
        indexers: {
          validate: (0, _utils.arrayOfType)("ObjectTypeIndexer"),
          optional: true,
          default: []
        },
        callProperties: {
          validate: (0, _utils.arrayOfType)("ObjectTypeCallProperty"),
          optional: true,
          default: []
        },
        internalSlots: {
          validate: (0, _utils.arrayOfType)("ObjectTypeInternalSlot"),
          optional: true,
          default: []
        },
        exact: {
          validate: (0, _utils.assertValueType)("boolean"),
          default: false
        },
        inexact: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("ObjectTypeInternalSlot", {
      visitor: ["id", "value"],
      builder: ["id", "value", "optional", "static", "method"],
      aliases: ["UserWhitespacable"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        value: (0, _utils.validateType)("FlowType"),
        optional: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        method: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("ObjectTypeCallProperty", {
      visitor: ["value"],
      aliases: ["UserWhitespacable"],
      fields: {
        value: (0, _utils.validateType)("FlowType"),
        static: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("ObjectTypeIndexer", {
      visitor: ["id", "key", "value", "variance"],
      aliases: ["UserWhitespacable"],
      fields: {
        id: (0, _utils.validateOptionalType)("Identifier"),
        key: (0, _utils.validateType)("FlowType"),
        value: (0, _utils.validateType)("FlowType"),
        static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        variance: (0, _utils.validateOptionalType)("Variance")
      }
    });
    defineType("ObjectTypeProperty", {
      visitor: ["key", "value", "variance"],
      aliases: ["UserWhitespacable"],
      fields: {
        key: (0, _utils.validateType)(["Identifier", "StringLiteral"]),
        value: (0, _utils.validateType)("FlowType"),
        kind: (0, _utils.validate)((0, _utils.assertOneOf)("init", "get", "set")),
        static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        proto: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        optional: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        variance: (0, _utils.validateOptionalType)("Variance"),
        method: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("ObjectTypeSpreadProperty", {
      visitor: ["argument"],
      aliases: ["UserWhitespacable"],
      fields: {
        argument: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("OpaqueType", {
      visitor: ["id", "typeParameters", "supertype", "impltype"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
        supertype: (0, _utils.validateOptionalType)("FlowType"),
        impltype: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("QualifiedTypeIdentifier", {
      visitor: ["id", "qualification"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        qualification: (0, _utils.validateType)(["Identifier", "QualifiedTypeIdentifier"])
      }
    });
    defineType("StringLiteralTypeAnnotation", {
      builder: ["value"],
      aliases: ["FlowType"],
      fields: {
        value: (0, _utils.validate)((0, _utils.assertValueType)("string"))
      }
    });
    defineType("StringTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("SymbolTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("ThisTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("TupleTypeAnnotation", {
      visitor: ["types"],
      aliases: ["FlowType"],
      fields: {
        types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
      }
    });
    defineType("TypeofTypeAnnotation", {
      visitor: ["argument"],
      aliases: ["FlowType"],
      fields: {
        argument: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("TypeAlias", {
      visitor: ["id", "typeParameters", "right"],
      aliases: ["FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
        right: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("TypeAnnotation", {
      visitor: ["typeAnnotation"],
      fields: {
        typeAnnotation: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("TypeCastExpression", {
      visitor: ["expression", "typeAnnotation"],
      aliases: ["ExpressionWrapper", "Expression"],
      fields: {
        expression: (0, _utils.validateType)("Expression"),
        typeAnnotation: (0, _utils.validateType)("TypeAnnotation")
      }
    });
    defineType("TypeParameter", {
      visitor: ["bound", "default", "variance"],
      fields: {
        name: (0, _utils.validate)((0, _utils.assertValueType)("string")),
        bound: (0, _utils.validateOptionalType)("TypeAnnotation"),
        default: (0, _utils.validateOptionalType)("FlowType"),
        variance: (0, _utils.validateOptionalType)("Variance")
      }
    });
    defineType("TypeParameterDeclaration", {
      visitor: ["params"],
      fields: {
        params: (0, _utils.validate)((0, _utils.arrayOfType)("TypeParameter"))
      }
    });
    defineType("TypeParameterInstantiation", {
      visitor: ["params"],
      fields: {
        params: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
      }
    });
    defineType("UnionTypeAnnotation", {
      visitor: ["types"],
      aliases: ["FlowType"],
      fields: {
        types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
      }
    });
    defineType("Variance", {
      builder: ["kind"],
      fields: {
        kind: (0, _utils.validate)((0, _utils.assertOneOf)("minus", "plus"))
      }
    });
    defineType("VoidTypeAnnotation", {
      aliases: ["FlowType", "FlowBaseAnnotation"]
    });
    defineType("EnumDeclaration", {
      aliases: ["Statement", "Declaration"],
      visitor: ["id", "body"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        body: (0, _utils.validateType)(["EnumBooleanBody", "EnumNumberBody", "EnumStringBody", "EnumSymbolBody"])
      }
    });
    defineType("EnumBooleanBody", {
      aliases: ["EnumBody"],
      visitor: ["members"],
      fields: {
        explicitType: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        members: (0, _utils.validateArrayOfType)("EnumBooleanMember"),
        hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("EnumNumberBody", {
      aliases: ["EnumBody"],
      visitor: ["members"],
      fields: {
        explicitType: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        members: (0, _utils.validateArrayOfType)("EnumNumberMember"),
        hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("EnumStringBody", {
      aliases: ["EnumBody"],
      visitor: ["members"],
      fields: {
        explicitType: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
        members: (0, _utils.validateArrayOfType)(["EnumStringMember", "EnumDefaultedMember"]),
        hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("EnumSymbolBody", {
      aliases: ["EnumBody"],
      visitor: ["members"],
      fields: {
        members: (0, _utils.validateArrayOfType)("EnumDefaultedMember"),
        hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
    defineType("EnumBooleanMember", {
      aliases: ["EnumMember"],
      visitor: ["id"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        init: (0, _utils.validateType)("BooleanLiteral")
      }
    });
    defineType("EnumNumberMember", {
      aliases: ["EnumMember"],
      visitor: ["id", "init"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        init: (0, _utils.validateType)("NumericLiteral")
      }
    });
    defineType("EnumStringMember", {
      aliases: ["EnumMember"],
      visitor: ["id", "init"],
      fields: {
        id: (0, _utils.validateType)("Identifier"),
        init: (0, _utils.validateType)("StringLiteral")
      }
    });
    defineType("EnumDefaultedMember", {
      aliases: ["EnumMember"],
      visitor: ["id"],
      fields: {
        id: (0, _utils.validateType)("Identifier")
      }
    });
    defineType("IndexedAccessType", {
      visitor: ["objectType", "indexType"],
      aliases: ["FlowType"],
      fields: {
        objectType: (0, _utils.validateType)("FlowType"),
        indexType: (0, _utils.validateType)("FlowType")
      }
    });
    defineType("OptionalIndexedAccessType", {
      visitor: ["objectType", "indexType"],
      aliases: ["FlowType"],
      fields: {
        objectType: (0, _utils.validateType)("FlowType"),
        indexType: (0, _utils.validateType)("FlowType"),
        optional: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
      }
    });
  }
});

// node_modules/@babel/types/lib/definitions/jsx.js
var require_jsx = __commonJS({
  "node_modules/@babel/types/lib/definitions/jsx.js"() {
    "use strict";
    var _utils = require_utils();
    var defineType = (0, _utils.defineAliasedType)("JSX");
    defineType("JSXAttribute", {
      visitor: ["name", "value"],
      aliases: ["Immutable"],
      fields: {
        name: {
          validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXNamespacedName")
        },
        value: {
          optional: true,
          validate: (0, _utils.assertNodeType)("JSXElement", "JSXFragment", "StringLiteral", "JSXExpressionContainer")
        }
      }
    });
    defineType("JSXClosingElement", {
      visitor: ["name"],
      aliases: ["Immutable"],
      fields: {
        name: {
          validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXMemberExpression", "JSXNamespacedName")
        }
      }
    });
    defineType("JSXElement", {
      builder: ["openingElement", "closingElement", "children", "selfClosing"],
      visitor: ["openingElement", "children", "closingElement"],
      aliases: ["Immutable", "Expression"],
      fields: Object.assign({
        openingElement: {
          validate: (0, _utils.assertNodeType)("JSXOpeningElement")
        },
        closingElement: {
          optional: true,
          validate: (0, _utils.assertNodeType)("JSXClosingElement")
        },
        children: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement", "JSXFragment")))
        }
      }, {
        selfClosing: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        }
      })
    });
    defineType("JSXEmptyExpression", {});
    defineType("JSXExpressionContainer", {
      visitor: ["expression"],
      aliases: ["Immutable"],
      fields: {
        expression: {
          validate: (0, _utils.assertNodeType)("Expression", "JSXEmptyExpression")
        }
      }
    });
    defineType("JSXSpreadChild", {
      visitor: ["expression"],
      aliases: ["Immutable"],
      fields: {
        expression: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("JSXIdentifier", {
      builder: ["name"],
      fields: {
        name: {
          validate: (0, _utils.assertValueType)("string")
        }
      }
    });
    defineType("JSXMemberExpression", {
      visitor: ["object", "property"],
      fields: {
        object: {
          validate: (0, _utils.assertNodeType)("JSXMemberExpression", "JSXIdentifier")
        },
        property: {
          validate: (0, _utils.assertNodeType)("JSXIdentifier")
        }
      }
    });
    defineType("JSXNamespacedName", {
      visitor: ["namespace", "name"],
      fields: {
        namespace: {
          validate: (0, _utils.assertNodeType)("JSXIdentifier")
        },
        name: {
          validate: (0, _utils.assertNodeType)("JSXIdentifier")
        }
      }
    });
    defineType("JSXOpeningElement", {
      builder: ["name", "attributes", "selfClosing"],
      visitor: ["name", "attributes"],
      aliases: ["Immutable"],
      fields: {
        name: {
          validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXMemberExpression", "JSXNamespacedName")
        },
        selfClosing: {
          default: false
        },
        attributes: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("JSXAttribute", "JSXSpreadAttribute")))
        },
        typeParameters: {
          validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
          optional: true
        }
      }
    });
    defineType("JSXSpreadAttribute", {
      visitor: ["argument"],
      fields: {
        argument: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    defineType("JSXText", {
      aliases: ["Immutable"],
      builder: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("string")
        }
      }
    });
    defineType("JSXFragment", {
      builder: ["openingFragment", "closingFragment", "children"],
      visitor: ["openingFragment", "children", "closingFragment"],
      aliases: ["Immutable", "Expression"],
      fields: {
        openingFragment: {
          validate: (0, _utils.assertNodeType)("JSXOpeningFragment")
        },
        closingFragment: {
          validate: (0, _utils.assertNodeType)("JSXClosingFragment")
        },
        children: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement", "JSXFragment")))
        }
      }
    });
    defineType("JSXOpeningFragment", {
      aliases: ["Immutable"]
    });
    defineType("JSXClosingFragment", {
      aliases: ["Immutable"]
    });
  }
});

// node_modules/@babel/types/lib/definitions/placeholders.js
var require_placeholders = __commonJS({
  "node_modules/@babel/types/lib/definitions/placeholders.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PLACEHOLDERS_FLIPPED_ALIAS = exports.PLACEHOLDERS_ALIAS = exports.PLACEHOLDERS = void 0;
    var _utils = require_utils();
    var PLACEHOLDERS = exports.PLACEHOLDERS = ["Identifier", "StringLiteral", "Expression", "Statement", "Declaration", "BlockStatement", "ClassBody", "Pattern"];
    var PLACEHOLDERS_ALIAS = exports.PLACEHOLDERS_ALIAS = {
      Declaration: ["Statement"],
      Pattern: ["PatternLike", "LVal"]
    };
    for (const type of PLACEHOLDERS) {
      const alias = _utils.ALIAS_KEYS[type];
      if (alias != null && alias.length) PLACEHOLDERS_ALIAS[type] = alias;
    }
    var PLACEHOLDERS_FLIPPED_ALIAS = exports.PLACEHOLDERS_FLIPPED_ALIAS = {};
    Object.keys(PLACEHOLDERS_ALIAS).forEach((type) => {
      PLACEHOLDERS_ALIAS[type].forEach((alias) => {
        if (!hasOwnProperty.call(PLACEHOLDERS_FLIPPED_ALIAS, alias)) {
          PLACEHOLDERS_FLIPPED_ALIAS[alias] = [];
        }
        PLACEHOLDERS_FLIPPED_ALIAS[alias].push(type);
      });
    });
  }
});

// node_modules/@babel/types/lib/definitions/misc.js
var require_misc = __commonJS({
  "node_modules/@babel/types/lib/definitions/misc.js"() {
    "use strict";
    var _utils = require_utils();
    var _placeholders = require_placeholders();
    var defineType = (0, _utils.defineAliasedType)("Miscellaneous");
    {
      defineType("Noop", {
        visitor: []
      });
    }
    defineType("Placeholder", {
      visitor: [],
      builder: ["expectedNode", "name"],
      fields: {
        name: {
          validate: (0, _utils.assertNodeType)("Identifier")
        },
        expectedNode: {
          validate: (0, _utils.assertOneOf)(..._placeholders.PLACEHOLDERS)
        }
      }
    });
    defineType("V8IntrinsicIdentifier", {
      builder: ["name"],
      fields: {
        name: {
          validate: (0, _utils.assertValueType)("string")
        }
      }
    });
  }
});

// node_modules/@babel/types/lib/definitions/experimental.js
var require_experimental = __commonJS({
  "node_modules/@babel/types/lib/definitions/experimental.js"() {
    "use strict";
    var _utils = require_utils();
    (0, _utils.default)("ArgumentPlaceholder", {});
    (0, _utils.default)("BindExpression", {
      visitor: ["object", "callee"],
      aliases: ["Expression"],
      fields: !process.env.BABEL_TYPES_8_BREAKING ? {
        object: {
          validate: Object.assign(() => {
          }, {
            oneOfNodeTypes: ["Expression"]
          })
        },
        callee: {
          validate: Object.assign(() => {
          }, {
            oneOfNodeTypes: ["Expression"]
          })
        }
      } : {
        object: {
          validate: (0, _utils.assertNodeType)("Expression")
        },
        callee: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    (0, _utils.default)("ImportAttribute", {
      visitor: ["key", "value"],
      fields: {
        key: {
          validate: (0, _utils.assertNodeType)("Identifier", "StringLiteral")
        },
        value: {
          validate: (0, _utils.assertNodeType)("StringLiteral")
        }
      }
    });
    (0, _utils.default)("Decorator", {
      visitor: ["expression"],
      fields: {
        expression: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      }
    });
    (0, _utils.default)("DoExpression", {
      visitor: ["body"],
      builder: ["body", "async"],
      aliases: ["Expression"],
      fields: {
        body: {
          validate: (0, _utils.assertNodeType)("BlockStatement")
        },
        async: {
          validate: (0, _utils.assertValueType)("boolean"),
          default: false
        }
      }
    });
    (0, _utils.default)("ExportDefaultSpecifier", {
      visitor: ["exported"],
      aliases: ["ModuleSpecifier"],
      fields: {
        exported: {
          validate: (0, _utils.assertNodeType)("Identifier")
        }
      }
    });
    (0, _utils.default)("RecordExpression", {
      visitor: ["properties"],
      aliases: ["Expression"],
      fields: {
        properties: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("ObjectProperty", "SpreadElement")))
        }
      }
    });
    (0, _utils.default)("TupleExpression", {
      fields: {
        elements: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Expression", "SpreadElement"))),
          default: []
        }
      },
      visitor: ["elements"],
      aliases: ["Expression"]
    });
    (0, _utils.default)("DecimalLiteral", {
      builder: ["value"],
      fields: {
        value: {
          validate: (0, _utils.assertValueType)("string")
        }
      },
      aliases: ["Expression", "Pureish", "Literal", "Immutable"]
    });
    (0, _utils.default)("ModuleExpression", {
      visitor: ["body"],
      fields: {
        body: {
          validate: (0, _utils.assertNodeType)("Program")
        }
      },
      aliases: ["Expression"]
    });
    (0, _utils.default)("TopicReference", {
      aliases: ["Expression"]
    });
    (0, _utils.default)("PipelineTopicExpression", {
      builder: ["expression"],
      visitor: ["expression"],
      fields: {
        expression: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      },
      aliases: ["Expression"]
    });
    (0, _utils.default)("PipelineBareFunction", {
      builder: ["callee"],
      visitor: ["callee"],
      fields: {
        callee: {
          validate: (0, _utils.assertNodeType)("Expression")
        }
      },
      aliases: ["Expression"]
    });
    (0, _utils.default)("PipelinePrimaryTopicReference", {
      aliases: ["Expression"]
    });
  }
});

// node_modules/@babel/types/lib/definitions/typescript.js
var require_typescript = __commonJS({
  "node_modules/@babel/types/lib/definitions/typescript.js"() {
    "use strict";
    var _utils = require_utils();
    var _core = require_core();
    var _is = require_is();
    var defineType = (0, _utils.defineAliasedType)("TypeScript");
    var bool = (0, _utils.assertValueType)("boolean");
    var tSFunctionTypeAnnotationCommon = () => ({
      returnType: {
        validate: (0, _utils.assertNodeType)("TSTypeAnnotation", "Noop"),
        optional: true
      },
      typeParameters: {
        validate: (0, _utils.assertNodeType)("TSTypeParameterDeclaration", "Noop"),
        optional: true
      }
    });
    defineType("TSParameterProperty", {
      aliases: ["LVal"],
      visitor: ["parameter"],
      fields: {
        accessibility: {
          validate: (0, _utils.assertOneOf)("public", "private", "protected"),
          optional: true
        },
        readonly: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        parameter: {
          validate: (0, _utils.assertNodeType)("Identifier", "AssignmentPattern")
        },
        override: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
          optional: true
        }
      }
    });
    defineType("TSDeclareFunction", {
      aliases: ["Statement", "Declaration"],
      visitor: ["id", "typeParameters", "params", "returnType"],
      fields: Object.assign({}, (0, _core.functionDeclarationCommon)(), tSFunctionTypeAnnotationCommon())
    });
    defineType("TSDeclareMethod", {
      visitor: ["decorators", "key", "typeParameters", "params", "returnType"],
      fields: Object.assign({}, (0, _core.classMethodOrDeclareMethodCommon)(), tSFunctionTypeAnnotationCommon())
    });
    defineType("TSQualifiedName", {
      aliases: ["TSEntityName"],
      visitor: ["left", "right"],
      fields: {
        left: (0, _utils.validateType)("TSEntityName"),
        right: (0, _utils.validateType)("Identifier")
      }
    });
    var signatureDeclarationCommon = () => ({
      typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
      ["parameters"]: (0, _utils.validateArrayOfType)(["ArrayPattern", "Identifier", "ObjectPattern", "RestElement"]),
      ["typeAnnotation"]: (0, _utils.validateOptionalType)("TSTypeAnnotation")
    });
    var callConstructSignatureDeclaration = {
      aliases: ["TSTypeElement"],
      visitor: ["typeParameters", "parameters", "typeAnnotation"],
      fields: signatureDeclarationCommon()
    };
    defineType("TSCallSignatureDeclaration", callConstructSignatureDeclaration);
    defineType("TSConstructSignatureDeclaration", callConstructSignatureDeclaration);
    var namedTypeElementCommon = () => ({
      key: (0, _utils.validateType)("Expression"),
      computed: {
        default: false
      },
      optional: (0, _utils.validateOptional)(bool)
    });
    defineType("TSPropertySignature", {
      aliases: ["TSTypeElement"],
      visitor: ["key", "typeAnnotation"],
      fields: Object.assign({}, namedTypeElementCommon(), {
        readonly: (0, _utils.validateOptional)(bool),
        typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation"),
        kind: {
          validate: (0, _utils.assertOneOf)("get", "set")
        }
      })
    });
    defineType("TSMethodSignature", {
      aliases: ["TSTypeElement"],
      visitor: ["key", "typeParameters", "parameters", "typeAnnotation"],
      fields: Object.assign({}, signatureDeclarationCommon(), namedTypeElementCommon(), {
        kind: {
          validate: (0, _utils.assertOneOf)("method", "get", "set")
        }
      })
    });
    defineType("TSIndexSignature", {
      aliases: ["TSTypeElement"],
      visitor: ["parameters", "typeAnnotation"],
      fields: {
        readonly: (0, _utils.validateOptional)(bool),
        static: (0, _utils.validateOptional)(bool),
        parameters: (0, _utils.validateArrayOfType)("Identifier"),
        typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation")
      }
    });
    var tsKeywordTypes = ["TSAnyKeyword", "TSBooleanKeyword", "TSBigIntKeyword", "TSIntrinsicKeyword", "TSNeverKeyword", "TSNullKeyword", "TSNumberKeyword", "TSObjectKeyword", "TSStringKeyword", "TSSymbolKeyword", "TSUndefinedKeyword", "TSUnknownKeyword", "TSVoidKeyword"];
    for (const type of tsKeywordTypes) {
      defineType(type, {
        aliases: ["TSType", "TSBaseType"],
        visitor: [],
        fields: {}
      });
    }
    defineType("TSThisType", {
      aliases: ["TSType", "TSBaseType"],
      visitor: [],
      fields: {}
    });
    var fnOrCtrBase = {
      aliases: ["TSType"],
      visitor: ["typeParameters", "parameters", "typeAnnotation"]
    };
    defineType("TSFunctionType", Object.assign({}, fnOrCtrBase, {
      fields: signatureDeclarationCommon()
    }));
    defineType("TSConstructorType", Object.assign({}, fnOrCtrBase, {
      fields: Object.assign({}, signatureDeclarationCommon(), {
        abstract: (0, _utils.validateOptional)(bool)
      })
    }));
    defineType("TSTypeReference", {
      aliases: ["TSType"],
      visitor: ["typeName", "typeParameters"],
      fields: {
        typeName: (0, _utils.validateType)("TSEntityName"),
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
      }
    });
    defineType("TSTypePredicate", {
      aliases: ["TSType"],
      visitor: ["parameterName", "typeAnnotation"],
      builder: ["parameterName", "typeAnnotation", "asserts"],
      fields: {
        parameterName: (0, _utils.validateType)(["Identifier", "TSThisType"]),
        typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation"),
        asserts: (0, _utils.validateOptional)(bool)
      }
    });
    defineType("TSTypeQuery", {
      aliases: ["TSType"],
      visitor: ["exprName", "typeParameters"],
      fields: {
        exprName: (0, _utils.validateType)(["TSEntityName", "TSImportType"]),
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
      }
    });
    defineType("TSTypeLiteral", {
      aliases: ["TSType"],
      visitor: ["members"],
      fields: {
        members: (0, _utils.validateArrayOfType)("TSTypeElement")
      }
    });
    defineType("TSArrayType", {
      aliases: ["TSType"],
      visitor: ["elementType"],
      fields: {
        elementType: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSTupleType", {
      aliases: ["TSType"],
      visitor: ["elementTypes"],
      fields: {
        elementTypes: (0, _utils.validateArrayOfType)(["TSType", "TSNamedTupleMember"])
      }
    });
    defineType("TSOptionalType", {
      aliases: ["TSType"],
      visitor: ["typeAnnotation"],
      fields: {
        typeAnnotation: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSRestType", {
      aliases: ["TSType"],
      visitor: ["typeAnnotation"],
      fields: {
        typeAnnotation: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSNamedTupleMember", {
      visitor: ["label", "elementType"],
      builder: ["label", "elementType", "optional"],
      fields: {
        label: (0, _utils.validateType)("Identifier"),
        optional: {
          validate: bool,
          default: false
        },
        elementType: (0, _utils.validateType)("TSType")
      }
    });
    var unionOrIntersection = {
      aliases: ["TSType"],
      visitor: ["types"],
      fields: {
        types: (0, _utils.validateArrayOfType)("TSType")
      }
    };
    defineType("TSUnionType", unionOrIntersection);
    defineType("TSIntersectionType", unionOrIntersection);
    defineType("TSConditionalType", {
      aliases: ["TSType"],
      visitor: ["checkType", "extendsType", "trueType", "falseType"],
      fields: {
        checkType: (0, _utils.validateType)("TSType"),
        extendsType: (0, _utils.validateType)("TSType"),
        trueType: (0, _utils.validateType)("TSType"),
        falseType: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSInferType", {
      aliases: ["TSType"],
      visitor: ["typeParameter"],
      fields: {
        typeParameter: (0, _utils.validateType)("TSTypeParameter")
      }
    });
    defineType("TSParenthesizedType", {
      aliases: ["TSType"],
      visitor: ["typeAnnotation"],
      fields: {
        typeAnnotation: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSTypeOperator", {
      aliases: ["TSType"],
      visitor: ["typeAnnotation"],
      fields: {
        operator: (0, _utils.validate)((0, _utils.assertValueType)("string")),
        typeAnnotation: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSIndexedAccessType", {
      aliases: ["TSType"],
      visitor: ["objectType", "indexType"],
      fields: {
        objectType: (0, _utils.validateType)("TSType"),
        indexType: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSMappedType", {
      aliases: ["TSType"],
      visitor: ["typeParameter", "typeAnnotation", "nameType"],
      fields: {
        readonly: (0, _utils.validateOptional)((0, _utils.assertOneOf)(true, false, "+", "-")),
        typeParameter: (0, _utils.validateType)("TSTypeParameter"),
        optional: (0, _utils.validateOptional)((0, _utils.assertOneOf)(true, false, "+", "-")),
        typeAnnotation: (0, _utils.validateOptionalType)("TSType"),
        nameType: (0, _utils.validateOptionalType)("TSType")
      }
    });
    defineType("TSLiteralType", {
      aliases: ["TSType", "TSBaseType"],
      visitor: ["literal"],
      fields: {
        literal: {
          validate: function() {
            const unaryExpression = (0, _utils.assertNodeType)("NumericLiteral", "BigIntLiteral");
            const unaryOperator = (0, _utils.assertOneOf)("-");
            const literal = (0, _utils.assertNodeType)("NumericLiteral", "StringLiteral", "BooleanLiteral", "BigIntLiteral", "TemplateLiteral");
            function validator(parent, key, node) {
              if ((0, _is.default)("UnaryExpression", node)) {
                unaryOperator(node, "operator", node.operator);
                unaryExpression(node, "argument", node.argument);
              } else {
                literal(parent, key, node);
              }
            }
            validator.oneOfNodeTypes = ["NumericLiteral", "StringLiteral", "BooleanLiteral", "BigIntLiteral", "TemplateLiteral", "UnaryExpression"];
            return validator;
          }()
        }
      }
    });
    defineType("TSExpressionWithTypeArguments", {
      aliases: ["TSType"],
      visitor: ["expression", "typeParameters"],
      fields: {
        expression: (0, _utils.validateType)("TSEntityName"),
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
      }
    });
    defineType("TSInterfaceDeclaration", {
      aliases: ["Statement", "Declaration"],
      visitor: ["id", "typeParameters", "extends", "body"],
      fields: {
        declare: (0, _utils.validateOptional)(bool),
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
        extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("TSExpressionWithTypeArguments")),
        body: (0, _utils.validateType)("TSInterfaceBody")
      }
    });
    defineType("TSInterfaceBody", {
      visitor: ["body"],
      fields: {
        body: (0, _utils.validateArrayOfType)("TSTypeElement")
      }
    });
    defineType("TSTypeAliasDeclaration", {
      aliases: ["Statement", "Declaration"],
      visitor: ["id", "typeParameters", "typeAnnotation"],
      fields: {
        declare: (0, _utils.validateOptional)(bool),
        id: (0, _utils.validateType)("Identifier"),
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
        typeAnnotation: (0, _utils.validateType)("TSType")
      }
    });
    defineType("TSInstantiationExpression", {
      aliases: ["Expression"],
      visitor: ["expression", "typeParameters"],
      fields: {
        expression: (0, _utils.validateType)("Expression"),
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
      }
    });
    var TSTypeExpression = {
      aliases: ["Expression", "LVal", "PatternLike"],
      visitor: ["expression", "typeAnnotation"],
      fields: {
        expression: (0, _utils.validateType)("Expression"),
        typeAnnotation: (0, _utils.validateType)("TSType")
      }
    };
    defineType("TSAsExpression", TSTypeExpression);
    defineType("TSSatisfiesExpression", TSTypeExpression);
    defineType("TSTypeAssertion", {
      aliases: ["Expression", "LVal", "PatternLike"],
      visitor: ["typeAnnotation", "expression"],
      fields: {
        typeAnnotation: (0, _utils.validateType)("TSType"),
        expression: (0, _utils.validateType)("Expression")
      }
    });
    defineType("TSEnumDeclaration", {
      aliases: ["Statement", "Declaration"],
      visitor: ["id", "members"],
      fields: {
        declare: (0, _utils.validateOptional)(bool),
        const: (0, _utils.validateOptional)(bool),
        id: (0, _utils.validateType)("Identifier"),
        members: (0, _utils.validateArrayOfType)("TSEnumMember"),
        initializer: (0, _utils.validateOptionalType)("Expression")
      }
    });
    defineType("TSEnumMember", {
      visitor: ["id", "initializer"],
      fields: {
        id: (0, _utils.validateType)(["Identifier", "StringLiteral"]),
        initializer: (0, _utils.validateOptionalType)("Expression")
      }
    });
    defineType("TSModuleDeclaration", {
      aliases: ["Statement", "Declaration"],
      visitor: ["id", "body"],
      fields: {
        declare: (0, _utils.validateOptional)(bool),
        global: (0, _utils.validateOptional)(bool),
        id: (0, _utils.validateType)(["Identifier", "StringLiteral"]),
        body: (0, _utils.validateType)(["TSModuleBlock", "TSModuleDeclaration"])
      }
    });
    defineType("TSModuleBlock", {
      aliases: ["Scopable", "Block", "BlockParent", "FunctionParent"],
      visitor: ["body"],
      fields: {
        body: (0, _utils.validateArrayOfType)("Statement")
      }
    });
    defineType("TSImportType", {
      aliases: ["TSType"],
      visitor: ["argument", "qualifier", "typeParameters"],
      fields: {
        argument: (0, _utils.validateType)("StringLiteral"),
        qualifier: (0, _utils.validateOptionalType)("TSEntityName"),
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation"),
        options: {
          validate: (0, _utils.assertNodeType)("Expression"),
          optional: true
        }
      }
    });
    defineType("TSImportEqualsDeclaration", {
      aliases: ["Statement"],
      visitor: ["id", "moduleReference"],
      fields: {
        isExport: (0, _utils.validate)(bool),
        id: (0, _utils.validateType)("Identifier"),
        moduleReference: (0, _utils.validateType)(["TSEntityName", "TSExternalModuleReference"]),
        importKind: {
          validate: (0, _utils.assertOneOf)("type", "value"),
          optional: true
        }
      }
    });
    defineType("TSExternalModuleReference", {
      visitor: ["expression"],
      fields: {
        expression: (0, _utils.validateType)("StringLiteral")
      }
    });
    defineType("TSNonNullExpression", {
      aliases: ["Expression", "LVal", "PatternLike"],
      visitor: ["expression"],
      fields: {
        expression: (0, _utils.validateType)("Expression")
      }
    });
    defineType("TSExportAssignment", {
      aliases: ["Statement"],
      visitor: ["expression"],
      fields: {
        expression: (0, _utils.validateType)("Expression")
      }
    });
    defineType("TSNamespaceExportDeclaration", {
      aliases: ["Statement"],
      visitor: ["id"],
      fields: {
        id: (0, _utils.validateType)("Identifier")
      }
    });
    defineType("TSTypeAnnotation", {
      visitor: ["typeAnnotation"],
      fields: {
        typeAnnotation: {
          validate: (0, _utils.assertNodeType)("TSType")
        }
      }
    });
    defineType("TSTypeParameterInstantiation", {
      visitor: ["params"],
      fields: {
        params: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSType")))
        }
      }
    });
    defineType("TSTypeParameterDeclaration", {
      visitor: ["params"],
      fields: {
        params: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSTypeParameter")))
        }
      }
    });
    defineType("TSTypeParameter", {
      builder: ["constraint", "default", "name"],
      visitor: ["constraint", "default"],
      fields: {
        name: {
          validate: (0, _utils.assertValueType)("string")
        },
        in: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        out: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        const: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: true
        },
        constraint: {
          validate: (0, _utils.assertNodeType)("TSType"),
          optional: true
        },
        default: {
          validate: (0, _utils.assertNodeType)("TSType"),
          optional: true
        }
      }
    });
  }
});

// node_modules/@babel/types/lib/definitions/deprecated-aliases.js
var require_deprecated_aliases = __commonJS({
  "node_modules/@babel/types/lib/definitions/deprecated-aliases.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DEPRECATED_ALIASES = void 0;
    var DEPRECATED_ALIASES = exports.DEPRECATED_ALIASES = {
      ModuleDeclaration: "ImportOrExportDeclaration"
    };
  }
});

// node_modules/@babel/types/lib/definitions/index.js
var require_definitions = __commonJS({
  "node_modules/@babel/types/lib/definitions/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "ALIAS_KEYS", {
      enumerable: true,
      get: function() {
        return _utils.ALIAS_KEYS;
      }
    });
    Object.defineProperty(exports, "BUILDER_KEYS", {
      enumerable: true,
      get: function() {
        return _utils.BUILDER_KEYS;
      }
    });
    Object.defineProperty(exports, "DEPRECATED_ALIASES", {
      enumerable: true,
      get: function() {
        return _deprecatedAliases.DEPRECATED_ALIASES;
      }
    });
    Object.defineProperty(exports, "DEPRECATED_KEYS", {
      enumerable: true,
      get: function() {
        return _utils.DEPRECATED_KEYS;
      }
    });
    Object.defineProperty(exports, "FLIPPED_ALIAS_KEYS", {
      enumerable: true,
      get: function() {
        return _utils.FLIPPED_ALIAS_KEYS;
      }
    });
    Object.defineProperty(exports, "NODE_FIELDS", {
      enumerable: true,
      get: function() {
        return _utils.NODE_FIELDS;
      }
    });
    Object.defineProperty(exports, "NODE_PARENT_VALIDATIONS", {
      enumerable: true,
      get: function() {
        return _utils.NODE_PARENT_VALIDATIONS;
      }
    });
    Object.defineProperty(exports, "PLACEHOLDERS", {
      enumerable: true,
      get: function() {
        return _placeholders.PLACEHOLDERS;
      }
    });
    Object.defineProperty(exports, "PLACEHOLDERS_ALIAS", {
      enumerable: true,
      get: function() {
        return _placeholders.PLACEHOLDERS_ALIAS;
      }
    });
    Object.defineProperty(exports, "PLACEHOLDERS_FLIPPED_ALIAS", {
      enumerable: true,
      get: function() {
        return _placeholders.PLACEHOLDERS_FLIPPED_ALIAS;
      }
    });
    exports.TYPES = void 0;
    Object.defineProperty(exports, "VISITOR_KEYS", {
      enumerable: true,
      get: function() {
        return _utils.VISITOR_KEYS;
      }
    });
    var _toFastProperties = require_to_fast_properties();
    require_core();
    require_flow();
    require_jsx();
    require_misc();
    require_experimental();
    require_typescript();
    var _utils = require_utils();
    var _placeholders = require_placeholders();
    var _deprecatedAliases = require_deprecated_aliases();
    Object.keys(_deprecatedAliases.DEPRECATED_ALIASES).forEach((deprecatedAlias) => {
      _utils.FLIPPED_ALIAS_KEYS[deprecatedAlias] = _utils.FLIPPED_ALIAS_KEYS[_deprecatedAliases.DEPRECATED_ALIASES[deprecatedAlias]];
    });
    _toFastProperties(_utils.VISITOR_KEYS);
    _toFastProperties(_utils.ALIAS_KEYS);
    _toFastProperties(_utils.FLIPPED_ALIAS_KEYS);
    _toFastProperties(_utils.NODE_FIELDS);
    _toFastProperties(_utils.BUILDER_KEYS);
    _toFastProperties(_utils.DEPRECATED_KEYS);
    _toFastProperties(_placeholders.PLACEHOLDERS_ALIAS);
    _toFastProperties(_placeholders.PLACEHOLDERS_FLIPPED_ALIAS);
    var TYPES = exports.TYPES = [].concat(Object.keys(_utils.VISITOR_KEYS), Object.keys(_utils.FLIPPED_ALIAS_KEYS), Object.keys(_utils.DEPRECATED_KEYS));
  }
});

// node_modules/@babel/types/lib/validators/validate.js
var require_validate = __commonJS({
  "node_modules/@babel/types/lib/validators/validate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = validate;
    exports.validateChild = validateChild;
    exports.validateField = validateField;
    var _index = require_definitions();
    function validate(node, key, val) {
      if (!node) return;
      const fields = _index.NODE_FIELDS[node.type];
      if (!fields) return;
      const field = fields[key];
      validateField(node, key, val, field);
      validateChild(node, key, val);
    }
    function validateField(node, key, val, field) {
      if (!(field != null && field.validate)) return;
      if (field.optional && val == null) return;
      field.validate(node, key, val);
    }
    function validateChild(node, key, val) {
      if (val == null) return;
      const validate2 = _index.NODE_PARENT_VALIDATIONS[val.type];
      if (!validate2) return;
      validate2(node, key, val);
    }
  }
});

// node_modules/@babel/types/lib/builders/validateNode.js
var require_validateNode = __commonJS({
  "node_modules/@babel/types/lib/builders/validateNode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = validateNode;
    var _validate = require_validate();
    var _index = require_lib3();
    function validateNode(node) {
      const keys = _index.BUILDER_KEYS[node.type];
      for (const key of keys) {
        (0, _validate.default)(node, key, node[key]);
      }
      return node;
    }
  }
});

// node_modules/@babel/types/lib/builders/generated/index.js
var require_generated2 = __commonJS({
  "node_modules/@babel/types/lib/builders/generated/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.anyTypeAnnotation = anyTypeAnnotation;
    exports.argumentPlaceholder = argumentPlaceholder;
    exports.arrayExpression = arrayExpression;
    exports.arrayPattern = arrayPattern;
    exports.arrayTypeAnnotation = arrayTypeAnnotation;
    exports.arrowFunctionExpression = arrowFunctionExpression;
    exports.assignmentExpression = assignmentExpression;
    exports.assignmentPattern = assignmentPattern;
    exports.awaitExpression = awaitExpression;
    exports.bigIntLiteral = bigIntLiteral;
    exports.binaryExpression = binaryExpression;
    exports.bindExpression = bindExpression;
    exports.blockStatement = blockStatement;
    exports.booleanLiteral = booleanLiteral;
    exports.booleanLiteralTypeAnnotation = booleanLiteralTypeAnnotation;
    exports.booleanTypeAnnotation = booleanTypeAnnotation;
    exports.breakStatement = breakStatement;
    exports.callExpression = callExpression;
    exports.catchClause = catchClause;
    exports.classAccessorProperty = classAccessorProperty;
    exports.classBody = classBody;
    exports.classDeclaration = classDeclaration;
    exports.classExpression = classExpression;
    exports.classImplements = classImplements;
    exports.classMethod = classMethod;
    exports.classPrivateMethod = classPrivateMethod;
    exports.classPrivateProperty = classPrivateProperty;
    exports.classProperty = classProperty;
    exports.conditionalExpression = conditionalExpression;
    exports.continueStatement = continueStatement;
    exports.debuggerStatement = debuggerStatement;
    exports.decimalLiteral = decimalLiteral;
    exports.declareClass = declareClass;
    exports.declareExportAllDeclaration = declareExportAllDeclaration;
    exports.declareExportDeclaration = declareExportDeclaration;
    exports.declareFunction = declareFunction;
    exports.declareInterface = declareInterface;
    exports.declareModule = declareModule;
    exports.declareModuleExports = declareModuleExports;
    exports.declareOpaqueType = declareOpaqueType;
    exports.declareTypeAlias = declareTypeAlias;
    exports.declareVariable = declareVariable;
    exports.declaredPredicate = declaredPredicate;
    exports.decorator = decorator;
    exports.directive = directive;
    exports.directiveLiteral = directiveLiteral;
    exports.doExpression = doExpression;
    exports.doWhileStatement = doWhileStatement;
    exports.emptyStatement = emptyStatement;
    exports.emptyTypeAnnotation = emptyTypeAnnotation;
    exports.enumBooleanBody = enumBooleanBody;
    exports.enumBooleanMember = enumBooleanMember;
    exports.enumDeclaration = enumDeclaration;
    exports.enumDefaultedMember = enumDefaultedMember;
    exports.enumNumberBody = enumNumberBody;
    exports.enumNumberMember = enumNumberMember;
    exports.enumStringBody = enumStringBody;
    exports.enumStringMember = enumStringMember;
    exports.enumSymbolBody = enumSymbolBody;
    exports.existsTypeAnnotation = existsTypeAnnotation;
    exports.exportAllDeclaration = exportAllDeclaration;
    exports.exportDefaultDeclaration = exportDefaultDeclaration;
    exports.exportDefaultSpecifier = exportDefaultSpecifier;
    exports.exportNamedDeclaration = exportNamedDeclaration;
    exports.exportNamespaceSpecifier = exportNamespaceSpecifier;
    exports.exportSpecifier = exportSpecifier;
    exports.expressionStatement = expressionStatement;
    exports.file = file;
    exports.forInStatement = forInStatement;
    exports.forOfStatement = forOfStatement;
    exports.forStatement = forStatement;
    exports.functionDeclaration = functionDeclaration;
    exports.functionExpression = functionExpression;
    exports.functionTypeAnnotation = functionTypeAnnotation;
    exports.functionTypeParam = functionTypeParam;
    exports.genericTypeAnnotation = genericTypeAnnotation;
    exports.identifier = identifier;
    exports.ifStatement = ifStatement;
    exports.import = _import;
    exports.importAttribute = importAttribute;
    exports.importDeclaration = importDeclaration;
    exports.importDefaultSpecifier = importDefaultSpecifier;
    exports.importExpression = importExpression;
    exports.importNamespaceSpecifier = importNamespaceSpecifier;
    exports.importSpecifier = importSpecifier;
    exports.indexedAccessType = indexedAccessType;
    exports.inferredPredicate = inferredPredicate;
    exports.interfaceDeclaration = interfaceDeclaration;
    exports.interfaceExtends = interfaceExtends;
    exports.interfaceTypeAnnotation = interfaceTypeAnnotation;
    exports.interpreterDirective = interpreterDirective;
    exports.intersectionTypeAnnotation = intersectionTypeAnnotation;
    exports.jSXAttribute = exports.jsxAttribute = jsxAttribute;
    exports.jSXClosingElement = exports.jsxClosingElement = jsxClosingElement;
    exports.jSXClosingFragment = exports.jsxClosingFragment = jsxClosingFragment;
    exports.jSXElement = exports.jsxElement = jsxElement;
    exports.jSXEmptyExpression = exports.jsxEmptyExpression = jsxEmptyExpression;
    exports.jSXExpressionContainer = exports.jsxExpressionContainer = jsxExpressionContainer;
    exports.jSXFragment = exports.jsxFragment = jsxFragment;
    exports.jSXIdentifier = exports.jsxIdentifier = jsxIdentifier;
    exports.jSXMemberExpression = exports.jsxMemberExpression = jsxMemberExpression;
    exports.jSXNamespacedName = exports.jsxNamespacedName = jsxNamespacedName;
    exports.jSXOpeningElement = exports.jsxOpeningElement = jsxOpeningElement;
    exports.jSXOpeningFragment = exports.jsxOpeningFragment = jsxOpeningFragment;
    exports.jSXSpreadAttribute = exports.jsxSpreadAttribute = jsxSpreadAttribute;
    exports.jSXSpreadChild = exports.jsxSpreadChild = jsxSpreadChild;
    exports.jSXText = exports.jsxText = jsxText;
    exports.labeledStatement = labeledStatement;
    exports.logicalExpression = logicalExpression;
    exports.memberExpression = memberExpression;
    exports.metaProperty = metaProperty;
    exports.mixedTypeAnnotation = mixedTypeAnnotation;
    exports.moduleExpression = moduleExpression;
    exports.newExpression = newExpression;
    exports.noop = noop;
    exports.nullLiteral = nullLiteral;
    exports.nullLiteralTypeAnnotation = nullLiteralTypeAnnotation;
    exports.nullableTypeAnnotation = nullableTypeAnnotation;
    exports.numberLiteral = NumberLiteral;
    exports.numberLiteralTypeAnnotation = numberLiteralTypeAnnotation;
    exports.numberTypeAnnotation = numberTypeAnnotation;
    exports.numericLiteral = numericLiteral;
    exports.objectExpression = objectExpression;
    exports.objectMethod = objectMethod;
    exports.objectPattern = objectPattern;
    exports.objectProperty = objectProperty;
    exports.objectTypeAnnotation = objectTypeAnnotation;
    exports.objectTypeCallProperty = objectTypeCallProperty;
    exports.objectTypeIndexer = objectTypeIndexer;
    exports.objectTypeInternalSlot = objectTypeInternalSlot;
    exports.objectTypeProperty = objectTypeProperty;
    exports.objectTypeSpreadProperty = objectTypeSpreadProperty;
    exports.opaqueType = opaqueType;
    exports.optionalCallExpression = optionalCallExpression;
    exports.optionalIndexedAccessType = optionalIndexedAccessType;
    exports.optionalMemberExpression = optionalMemberExpression;
    exports.parenthesizedExpression = parenthesizedExpression;
    exports.pipelineBareFunction = pipelineBareFunction;
    exports.pipelinePrimaryTopicReference = pipelinePrimaryTopicReference;
    exports.pipelineTopicExpression = pipelineTopicExpression;
    exports.placeholder = placeholder;
    exports.privateName = privateName;
    exports.program = program;
    exports.qualifiedTypeIdentifier = qualifiedTypeIdentifier;
    exports.recordExpression = recordExpression;
    exports.regExpLiteral = regExpLiteral;
    exports.regexLiteral = RegexLiteral;
    exports.restElement = restElement;
    exports.restProperty = RestProperty;
    exports.returnStatement = returnStatement;
    exports.sequenceExpression = sequenceExpression;
    exports.spreadElement = spreadElement;
    exports.spreadProperty = SpreadProperty;
    exports.staticBlock = staticBlock;
    exports.stringLiteral = stringLiteral;
    exports.stringLiteralTypeAnnotation = stringLiteralTypeAnnotation;
    exports.stringTypeAnnotation = stringTypeAnnotation;
    exports.super = _super;
    exports.switchCase = switchCase;
    exports.switchStatement = switchStatement;
    exports.symbolTypeAnnotation = symbolTypeAnnotation;
    exports.taggedTemplateExpression = taggedTemplateExpression;
    exports.templateElement = templateElement;
    exports.templateLiteral = templateLiteral;
    exports.thisExpression = thisExpression;
    exports.thisTypeAnnotation = thisTypeAnnotation;
    exports.throwStatement = throwStatement;
    exports.topicReference = topicReference;
    exports.tryStatement = tryStatement;
    exports.tSAnyKeyword = exports.tsAnyKeyword = tsAnyKeyword;
    exports.tSArrayType = exports.tsArrayType = tsArrayType;
    exports.tSAsExpression = exports.tsAsExpression = tsAsExpression;
    exports.tSBigIntKeyword = exports.tsBigIntKeyword = tsBigIntKeyword;
    exports.tSBooleanKeyword = exports.tsBooleanKeyword = tsBooleanKeyword;
    exports.tSCallSignatureDeclaration = exports.tsCallSignatureDeclaration = tsCallSignatureDeclaration;
    exports.tSConditionalType = exports.tsConditionalType = tsConditionalType;
    exports.tSConstructSignatureDeclaration = exports.tsConstructSignatureDeclaration = tsConstructSignatureDeclaration;
    exports.tSConstructorType = exports.tsConstructorType = tsConstructorType;
    exports.tSDeclareFunction = exports.tsDeclareFunction = tsDeclareFunction;
    exports.tSDeclareMethod = exports.tsDeclareMethod = tsDeclareMethod;
    exports.tSEnumDeclaration = exports.tsEnumDeclaration = tsEnumDeclaration;
    exports.tSEnumMember = exports.tsEnumMember = tsEnumMember;
    exports.tSExportAssignment = exports.tsExportAssignment = tsExportAssignment;
    exports.tSExpressionWithTypeArguments = exports.tsExpressionWithTypeArguments = tsExpressionWithTypeArguments;
    exports.tSExternalModuleReference = exports.tsExternalModuleReference = tsExternalModuleReference;
    exports.tSFunctionType = exports.tsFunctionType = tsFunctionType;
    exports.tSImportEqualsDeclaration = exports.tsImportEqualsDeclaration = tsImportEqualsDeclaration;
    exports.tSImportType = exports.tsImportType = tsImportType;
    exports.tSIndexSignature = exports.tsIndexSignature = tsIndexSignature;
    exports.tSIndexedAccessType = exports.tsIndexedAccessType = tsIndexedAccessType;
    exports.tSInferType = exports.tsInferType = tsInferType;
    exports.tSInstantiationExpression = exports.tsInstantiationExpression = tsInstantiationExpression;
    exports.tSInterfaceBody = exports.tsInterfaceBody = tsInterfaceBody;
    exports.tSInterfaceDeclaration = exports.tsInterfaceDeclaration = tsInterfaceDeclaration;
    exports.tSIntersectionType = exports.tsIntersectionType = tsIntersectionType;
    exports.tSIntrinsicKeyword = exports.tsIntrinsicKeyword = tsIntrinsicKeyword;
    exports.tSLiteralType = exports.tsLiteralType = tsLiteralType;
    exports.tSMappedType = exports.tsMappedType = tsMappedType;
    exports.tSMethodSignature = exports.tsMethodSignature = tsMethodSignature;
    exports.tSModuleBlock = exports.tsModuleBlock = tsModuleBlock;
    exports.tSModuleDeclaration = exports.tsModuleDeclaration = tsModuleDeclaration;
    exports.tSNamedTupleMember = exports.tsNamedTupleMember = tsNamedTupleMember;
    exports.tSNamespaceExportDeclaration = exports.tsNamespaceExportDeclaration = tsNamespaceExportDeclaration;
    exports.tSNeverKeyword = exports.tsNeverKeyword = tsNeverKeyword;
    exports.tSNonNullExpression = exports.tsNonNullExpression = tsNonNullExpression;
    exports.tSNullKeyword = exports.tsNullKeyword = tsNullKeyword;
    exports.tSNumberKeyword = exports.tsNumberKeyword = tsNumberKeyword;
    exports.tSObjectKeyword = exports.tsObjectKeyword = tsObjectKeyword;
    exports.tSOptionalType = exports.tsOptionalType = tsOptionalType;
    exports.tSParameterProperty = exports.tsParameterProperty = tsParameterProperty;
    exports.tSParenthesizedType = exports.tsParenthesizedType = tsParenthesizedType;
    exports.tSPropertySignature = exports.tsPropertySignature = tsPropertySignature;
    exports.tSQualifiedName = exports.tsQualifiedName = tsQualifiedName;
    exports.tSRestType = exports.tsRestType = tsRestType;
    exports.tSSatisfiesExpression = exports.tsSatisfiesExpression = tsSatisfiesExpression;
    exports.tSStringKeyword = exports.tsStringKeyword = tsStringKeyword;
    exports.tSSymbolKeyword = exports.tsSymbolKeyword = tsSymbolKeyword;
    exports.tSThisType = exports.tsThisType = tsThisType;
    exports.tSTupleType = exports.tsTupleType = tsTupleType;
    exports.tSTypeAliasDeclaration = exports.tsTypeAliasDeclaration = tsTypeAliasDeclaration;
    exports.tSTypeAnnotation = exports.tsTypeAnnotation = tsTypeAnnotation;
    exports.tSTypeAssertion = exports.tsTypeAssertion = tsTypeAssertion;
    exports.tSTypeLiteral = exports.tsTypeLiteral = tsTypeLiteral;
    exports.tSTypeOperator = exports.tsTypeOperator = tsTypeOperator;
    exports.tSTypeParameter = exports.tsTypeParameter = tsTypeParameter;
    exports.tSTypeParameterDeclaration = exports.tsTypeParameterDeclaration = tsTypeParameterDeclaration;
    exports.tSTypeParameterInstantiation = exports.tsTypeParameterInstantiation = tsTypeParameterInstantiation;
    exports.tSTypePredicate = exports.tsTypePredicate = tsTypePredicate;
    exports.tSTypeQuery = exports.tsTypeQuery = tsTypeQuery;
    exports.tSTypeReference = exports.tsTypeReference = tsTypeReference;
    exports.tSUndefinedKeyword = exports.tsUndefinedKeyword = tsUndefinedKeyword;
    exports.tSUnionType = exports.tsUnionType = tsUnionType;
    exports.tSUnknownKeyword = exports.tsUnknownKeyword = tsUnknownKeyword;
    exports.tSVoidKeyword = exports.tsVoidKeyword = tsVoidKeyword;
    exports.tupleExpression = tupleExpression;
    exports.tupleTypeAnnotation = tupleTypeAnnotation;
    exports.typeAlias = typeAlias;
    exports.typeAnnotation = typeAnnotation;
    exports.typeCastExpression = typeCastExpression;
    exports.typeParameter = typeParameter;
    exports.typeParameterDeclaration = typeParameterDeclaration;
    exports.typeParameterInstantiation = typeParameterInstantiation;
    exports.typeofTypeAnnotation = typeofTypeAnnotation;
    exports.unaryExpression = unaryExpression;
    exports.unionTypeAnnotation = unionTypeAnnotation;
    exports.updateExpression = updateExpression;
    exports.v8IntrinsicIdentifier = v8IntrinsicIdentifier;
    exports.variableDeclaration = variableDeclaration;
    exports.variableDeclarator = variableDeclarator;
    exports.variance = variance;
    exports.voidTypeAnnotation = voidTypeAnnotation;
    exports.whileStatement = whileStatement;
    exports.withStatement = withStatement;
    exports.yieldExpression = yieldExpression;
    var _validateNode = require_validateNode();
    var _deprecationWarning = require_deprecationWarning();
    function arrayExpression(elements = []) {
      return (0, _validateNode.default)({
        type: "ArrayExpression",
        elements
      });
    }
    function assignmentExpression(operator, left, right) {
      return (0, _validateNode.default)({
        type: "AssignmentExpression",
        operator,
        left,
        right
      });
    }
    function binaryExpression(operator, left, right) {
      return (0, _validateNode.default)({
        type: "BinaryExpression",
        operator,
        left,
        right
      });
    }
    function interpreterDirective(value) {
      return (0, _validateNode.default)({
        type: "InterpreterDirective",
        value
      });
    }
    function directive(value) {
      return (0, _validateNode.default)({
        type: "Directive",
        value
      });
    }
    function directiveLiteral(value) {
      return (0, _validateNode.default)({
        type: "DirectiveLiteral",
        value
      });
    }
    function blockStatement(body, directives = []) {
      return (0, _validateNode.default)({
        type: "BlockStatement",
        body,
        directives
      });
    }
    function breakStatement(label = null) {
      return (0, _validateNode.default)({
        type: "BreakStatement",
        label
      });
    }
    function callExpression(callee, _arguments) {
      return (0, _validateNode.default)({
        type: "CallExpression",
        callee,
        arguments: _arguments
      });
    }
    function catchClause(param = null, body) {
      return (0, _validateNode.default)({
        type: "CatchClause",
        param,
        body
      });
    }
    function conditionalExpression(test, consequent, alternate) {
      return (0, _validateNode.default)({
        type: "ConditionalExpression",
        test,
        consequent,
        alternate
      });
    }
    function continueStatement(label = null) {
      return (0, _validateNode.default)({
        type: "ContinueStatement",
        label
      });
    }
    function debuggerStatement() {
      return {
        type: "DebuggerStatement"
      };
    }
    function doWhileStatement(test, body) {
      return (0, _validateNode.default)({
        type: "DoWhileStatement",
        test,
        body
      });
    }
    function emptyStatement() {
      return {
        type: "EmptyStatement"
      };
    }
    function expressionStatement(expression) {
      return (0, _validateNode.default)({
        type: "ExpressionStatement",
        expression
      });
    }
    function file(program2, comments = null, tokens = null) {
      return (0, _validateNode.default)({
        type: "File",
        program: program2,
        comments,
        tokens
      });
    }
    function forInStatement(left, right, body) {
      return (0, _validateNode.default)({
        type: "ForInStatement",
        left,
        right,
        body
      });
    }
    function forStatement(init = null, test = null, update = null, body) {
      return (0, _validateNode.default)({
        type: "ForStatement",
        init,
        test,
        update,
        body
      });
    }
    function functionDeclaration(id = null, params, body, generator = false, async = false) {
      return (0, _validateNode.default)({
        type: "FunctionDeclaration",
        id,
        params,
        body,
        generator,
        async
      });
    }
    function functionExpression(id = null, params, body, generator = false, async = false) {
      return (0, _validateNode.default)({
        type: "FunctionExpression",
        id,
        params,
        body,
        generator,
        async
      });
    }
    function identifier(name) {
      return (0, _validateNode.default)({
        type: "Identifier",
        name
      });
    }
    function ifStatement(test, consequent, alternate = null) {
      return (0, _validateNode.default)({
        type: "IfStatement",
        test,
        consequent,
        alternate
      });
    }
    function labeledStatement(label, body) {
      return (0, _validateNode.default)({
        type: "LabeledStatement",
        label,
        body
      });
    }
    function stringLiteral(value) {
      return (0, _validateNode.default)({
        type: "StringLiteral",
        value
      });
    }
    function numericLiteral(value) {
      return (0, _validateNode.default)({
        type: "NumericLiteral",
        value
      });
    }
    function nullLiteral() {
      return {
        type: "NullLiteral"
      };
    }
    function booleanLiteral(value) {
      return (0, _validateNode.default)({
        type: "BooleanLiteral",
        value
      });
    }
    function regExpLiteral(pattern, flags = "") {
      return (0, _validateNode.default)({
        type: "RegExpLiteral",
        pattern,
        flags
      });
    }
    function logicalExpression(operator, left, right) {
      return (0, _validateNode.default)({
        type: "LogicalExpression",
        operator,
        left,
        right
      });
    }
    function memberExpression(object, property, computed = false, optional2 = null) {
      return (0, _validateNode.default)({
        type: "MemberExpression",
        object,
        property,
        computed,
        optional: optional2
      });
    }
    function newExpression(callee, _arguments) {
      return (0, _validateNode.default)({
        type: "NewExpression",
        callee,
        arguments: _arguments
      });
    }
    function program(body, directives = [], sourceType = "script", interpreter = null) {
      return (0, _validateNode.default)({
        type: "Program",
        body,
        directives,
        sourceType,
        interpreter
      });
    }
    function objectExpression(properties) {
      return (0, _validateNode.default)({
        type: "ObjectExpression",
        properties
      });
    }
    function objectMethod(kind = "method", key, params, body, computed = false, generator = false, async = false) {
      return (0, _validateNode.default)({
        type: "ObjectMethod",
        kind,
        key,
        params,
        body,
        computed,
        generator,
        async
      });
    }
    function objectProperty(key, value, computed = false, shorthand = false, decorators = null) {
      return (0, _validateNode.default)({
        type: "ObjectProperty",
        key,
        value,
        computed,
        shorthand,
        decorators
      });
    }
    function restElement(argument) {
      return (0, _validateNode.default)({
        type: "RestElement",
        argument
      });
    }
    function returnStatement(argument = null) {
      return (0, _validateNode.default)({
        type: "ReturnStatement",
        argument
      });
    }
    function sequenceExpression(expressions) {
      return (0, _validateNode.default)({
        type: "SequenceExpression",
        expressions
      });
    }
    function parenthesizedExpression(expression) {
      return (0, _validateNode.default)({
        type: "ParenthesizedExpression",
        expression
      });
    }
    function switchCase(test = null, consequent) {
      return (0, _validateNode.default)({
        type: "SwitchCase",
        test,
        consequent
      });
    }
    function switchStatement(discriminant, cases) {
      return (0, _validateNode.default)({
        type: "SwitchStatement",
        discriminant,
        cases
      });
    }
    function thisExpression() {
      return {
        type: "ThisExpression"
      };
    }
    function throwStatement(argument) {
      return (0, _validateNode.default)({
        type: "ThrowStatement",
        argument
      });
    }
    function tryStatement(block, handler = null, finalizer = null) {
      return (0, _validateNode.default)({
        type: "TryStatement",
        block,
        handler,
        finalizer
      });
    }
    function unaryExpression(operator, argument, prefix = true) {
      return (0, _validateNode.default)({
        type: "UnaryExpression",
        operator,
        argument,
        prefix
      });
    }
    function updateExpression(operator, argument, prefix = false) {
      return (0, _validateNode.default)({
        type: "UpdateExpression",
        operator,
        argument,
        prefix
      });
    }
    function variableDeclaration(kind, declarations) {
      return (0, _validateNode.default)({
        type: "VariableDeclaration",
        kind,
        declarations
      });
    }
    function variableDeclarator(id, init = null) {
      return (0, _validateNode.default)({
        type: "VariableDeclarator",
        id,
        init
      });
    }
    function whileStatement(test, body) {
      return (0, _validateNode.default)({
        type: "WhileStatement",
        test,
        body
      });
    }
    function withStatement(object, body) {
      return (0, _validateNode.default)({
        type: "WithStatement",
        object,
        body
      });
    }
    function assignmentPattern(left, right) {
      return (0, _validateNode.default)({
        type: "AssignmentPattern",
        left,
        right
      });
    }
    function arrayPattern(elements) {
      return (0, _validateNode.default)({
        type: "ArrayPattern",
        elements
      });
    }
    function arrowFunctionExpression(params, body, async = false) {
      return (0, _validateNode.default)({
        type: "ArrowFunctionExpression",
        params,
        body,
        async,
        expression: null
      });
    }
    function classBody(body) {
      return (0, _validateNode.default)({
        type: "ClassBody",
        body
      });
    }
    function classExpression(id = null, superClass = null, body, decorators = null) {
      return (0, _validateNode.default)({
        type: "ClassExpression",
        id,
        superClass,
        body,
        decorators
      });
    }
    function classDeclaration(id = null, superClass = null, body, decorators = null) {
      return (0, _validateNode.default)({
        type: "ClassDeclaration",
        id,
        superClass,
        body,
        decorators
      });
    }
    function exportAllDeclaration(source) {
      return (0, _validateNode.default)({
        type: "ExportAllDeclaration",
        source
      });
    }
    function exportDefaultDeclaration(declaration) {
      return (0, _validateNode.default)({
        type: "ExportDefaultDeclaration",
        declaration
      });
    }
    function exportNamedDeclaration(declaration = null, specifiers = [], source = null) {
      return (0, _validateNode.default)({
        type: "ExportNamedDeclaration",
        declaration,
        specifiers,
        source
      });
    }
    function exportSpecifier(local, exported) {
      return (0, _validateNode.default)({
        type: "ExportSpecifier",
        local,
        exported
      });
    }
    function forOfStatement(left, right, body, _await = false) {
      return (0, _validateNode.default)({
        type: "ForOfStatement",
        left,
        right,
        body,
        await: _await
      });
    }
    function importDeclaration(specifiers, source) {
      return (0, _validateNode.default)({
        type: "ImportDeclaration",
        specifiers,
        source
      });
    }
    function importDefaultSpecifier(local) {
      return (0, _validateNode.default)({
        type: "ImportDefaultSpecifier",
        local
      });
    }
    function importNamespaceSpecifier(local) {
      return (0, _validateNode.default)({
        type: "ImportNamespaceSpecifier",
        local
      });
    }
    function importSpecifier(local, imported) {
      return (0, _validateNode.default)({
        type: "ImportSpecifier",
        local,
        imported
      });
    }
    function importExpression(source, options = null) {
      return (0, _validateNode.default)({
        type: "ImportExpression",
        source,
        options
      });
    }
    function metaProperty(meta, property) {
      return (0, _validateNode.default)({
        type: "MetaProperty",
        meta,
        property
      });
    }
    function classMethod(kind = "method", key, params, body, computed = false, _static = false, generator = false, async = false) {
      return (0, _validateNode.default)({
        type: "ClassMethod",
        kind,
        key,
        params,
        body,
        computed,
        static: _static,
        generator,
        async
      });
    }
    function objectPattern(properties) {
      return (0, _validateNode.default)({
        type: "ObjectPattern",
        properties
      });
    }
    function spreadElement(argument) {
      return (0, _validateNode.default)({
        type: "SpreadElement",
        argument
      });
    }
    function _super() {
      return {
        type: "Super"
      };
    }
    function taggedTemplateExpression(tag, quasi) {
      return (0, _validateNode.default)({
        type: "TaggedTemplateExpression",
        tag,
        quasi
      });
    }
    function templateElement(value, tail = false) {
      return (0, _validateNode.default)({
        type: "TemplateElement",
        value,
        tail
      });
    }
    function templateLiteral(quasis, expressions) {
      return (0, _validateNode.default)({
        type: "TemplateLiteral",
        quasis,
        expressions
      });
    }
    function yieldExpression(argument = null, delegate = false) {
      return (0, _validateNode.default)({
        type: "YieldExpression",
        argument,
        delegate
      });
    }
    function awaitExpression(argument) {
      return (0, _validateNode.default)({
        type: "AwaitExpression",
        argument
      });
    }
    function _import() {
      return {
        type: "Import"
      };
    }
    function bigIntLiteral(value) {
      return (0, _validateNode.default)({
        type: "BigIntLiteral",
        value
      });
    }
    function exportNamespaceSpecifier(exported) {
      return (0, _validateNode.default)({
        type: "ExportNamespaceSpecifier",
        exported
      });
    }
    function optionalMemberExpression(object, property, computed = false, optional2) {
      return (0, _validateNode.default)({
        type: "OptionalMemberExpression",
        object,
        property,
        computed,
        optional: optional2
      });
    }
    function optionalCallExpression(callee, _arguments, optional2) {
      return (0, _validateNode.default)({
        type: "OptionalCallExpression",
        callee,
        arguments: _arguments,
        optional: optional2
      });
    }
    function classProperty(key, value = null, typeAnnotation2 = null, decorators = null, computed = false, _static = false) {
      return (0, _validateNode.default)({
        type: "ClassProperty",
        key,
        value,
        typeAnnotation: typeAnnotation2,
        decorators,
        computed,
        static: _static
      });
    }
    function classAccessorProperty(key, value = null, typeAnnotation2 = null, decorators = null, computed = false, _static = false) {
      return (0, _validateNode.default)({
        type: "ClassAccessorProperty",
        key,
        value,
        typeAnnotation: typeAnnotation2,
        decorators,
        computed,
        static: _static
      });
    }
    function classPrivateProperty(key, value = null, decorators = null, _static = false) {
      return (0, _validateNode.default)({
        type: "ClassPrivateProperty",
        key,
        value,
        decorators,
        static: _static
      });
    }
    function classPrivateMethod(kind = "method", key, params, body, _static = false) {
      return (0, _validateNode.default)({
        type: "ClassPrivateMethod",
        kind,
        key,
        params,
        body,
        static: _static
      });
    }
    function privateName(id) {
      return (0, _validateNode.default)({
        type: "PrivateName",
        id
      });
    }
    function staticBlock(body) {
      return (0, _validateNode.default)({
        type: "StaticBlock",
        body
      });
    }
    function anyTypeAnnotation() {
      return {
        type: "AnyTypeAnnotation"
      };
    }
    function arrayTypeAnnotation(elementType) {
      return (0, _validateNode.default)({
        type: "ArrayTypeAnnotation",
        elementType
      });
    }
    function booleanTypeAnnotation() {
      return {
        type: "BooleanTypeAnnotation"
      };
    }
    function booleanLiteralTypeAnnotation(value) {
      return (0, _validateNode.default)({
        type: "BooleanLiteralTypeAnnotation",
        value
      });
    }
    function nullLiteralTypeAnnotation() {
      return {
        type: "NullLiteralTypeAnnotation"
      };
    }
    function classImplements(id, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "ClassImplements",
        id,
        typeParameters
      });
    }
    function declareClass(id, typeParameters = null, _extends = null, body) {
      return (0, _validateNode.default)({
        type: "DeclareClass",
        id,
        typeParameters,
        extends: _extends,
        body
      });
    }
    function declareFunction(id) {
      return (0, _validateNode.default)({
        type: "DeclareFunction",
        id
      });
    }
    function declareInterface(id, typeParameters = null, _extends = null, body) {
      return (0, _validateNode.default)({
        type: "DeclareInterface",
        id,
        typeParameters,
        extends: _extends,
        body
      });
    }
    function declareModule(id, body, kind = null) {
      return (0, _validateNode.default)({
        type: "DeclareModule",
        id,
        body,
        kind
      });
    }
    function declareModuleExports(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "DeclareModuleExports",
        typeAnnotation: typeAnnotation2
      });
    }
    function declareTypeAlias(id, typeParameters = null, right) {
      return (0, _validateNode.default)({
        type: "DeclareTypeAlias",
        id,
        typeParameters,
        right
      });
    }
    function declareOpaqueType(id, typeParameters = null, supertype = null) {
      return (0, _validateNode.default)({
        type: "DeclareOpaqueType",
        id,
        typeParameters,
        supertype
      });
    }
    function declareVariable(id) {
      return (0, _validateNode.default)({
        type: "DeclareVariable",
        id
      });
    }
    function declareExportDeclaration(declaration = null, specifiers = null, source = null) {
      return (0, _validateNode.default)({
        type: "DeclareExportDeclaration",
        declaration,
        specifiers,
        source
      });
    }
    function declareExportAllDeclaration(source) {
      return (0, _validateNode.default)({
        type: "DeclareExportAllDeclaration",
        source
      });
    }
    function declaredPredicate(value) {
      return (0, _validateNode.default)({
        type: "DeclaredPredicate",
        value
      });
    }
    function existsTypeAnnotation() {
      return {
        type: "ExistsTypeAnnotation"
      };
    }
    function functionTypeAnnotation(typeParameters = null, params, rest = null, returnType) {
      return (0, _validateNode.default)({
        type: "FunctionTypeAnnotation",
        typeParameters,
        params,
        rest,
        returnType
      });
    }
    function functionTypeParam(name = null, typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "FunctionTypeParam",
        name,
        typeAnnotation: typeAnnotation2
      });
    }
    function genericTypeAnnotation(id, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "GenericTypeAnnotation",
        id,
        typeParameters
      });
    }
    function inferredPredicate() {
      return {
        type: "InferredPredicate"
      };
    }
    function interfaceExtends(id, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "InterfaceExtends",
        id,
        typeParameters
      });
    }
    function interfaceDeclaration(id, typeParameters = null, _extends = null, body) {
      return (0, _validateNode.default)({
        type: "InterfaceDeclaration",
        id,
        typeParameters,
        extends: _extends,
        body
      });
    }
    function interfaceTypeAnnotation(_extends = null, body) {
      return (0, _validateNode.default)({
        type: "InterfaceTypeAnnotation",
        extends: _extends,
        body
      });
    }
    function intersectionTypeAnnotation(types) {
      return (0, _validateNode.default)({
        type: "IntersectionTypeAnnotation",
        types
      });
    }
    function mixedTypeAnnotation() {
      return {
        type: "MixedTypeAnnotation"
      };
    }
    function emptyTypeAnnotation() {
      return {
        type: "EmptyTypeAnnotation"
      };
    }
    function nullableTypeAnnotation(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "NullableTypeAnnotation",
        typeAnnotation: typeAnnotation2
      });
    }
    function numberLiteralTypeAnnotation(value) {
      return (0, _validateNode.default)({
        type: "NumberLiteralTypeAnnotation",
        value
      });
    }
    function numberTypeAnnotation() {
      return {
        type: "NumberTypeAnnotation"
      };
    }
    function objectTypeAnnotation(properties, indexers = [], callProperties = [], internalSlots = [], exact = false) {
      return (0, _validateNode.default)({
        type: "ObjectTypeAnnotation",
        properties,
        indexers,
        callProperties,
        internalSlots,
        exact
      });
    }
    function objectTypeInternalSlot(id, value, optional2, _static, method) {
      return (0, _validateNode.default)({
        type: "ObjectTypeInternalSlot",
        id,
        value,
        optional: optional2,
        static: _static,
        method
      });
    }
    function objectTypeCallProperty(value) {
      return (0, _validateNode.default)({
        type: "ObjectTypeCallProperty",
        value,
        static: null
      });
    }
    function objectTypeIndexer(id = null, key, value, variance2 = null) {
      return (0, _validateNode.default)({
        type: "ObjectTypeIndexer",
        id,
        key,
        value,
        variance: variance2,
        static: null
      });
    }
    function objectTypeProperty(key, value, variance2 = null) {
      return (0, _validateNode.default)({
        type: "ObjectTypeProperty",
        key,
        value,
        variance: variance2,
        kind: null,
        method: null,
        optional: null,
        proto: null,
        static: null
      });
    }
    function objectTypeSpreadProperty(argument) {
      return (0, _validateNode.default)({
        type: "ObjectTypeSpreadProperty",
        argument
      });
    }
    function opaqueType(id, typeParameters = null, supertype = null, impltype) {
      return (0, _validateNode.default)({
        type: "OpaqueType",
        id,
        typeParameters,
        supertype,
        impltype
      });
    }
    function qualifiedTypeIdentifier(id, qualification) {
      return (0, _validateNode.default)({
        type: "QualifiedTypeIdentifier",
        id,
        qualification
      });
    }
    function stringLiteralTypeAnnotation(value) {
      return (0, _validateNode.default)({
        type: "StringLiteralTypeAnnotation",
        value
      });
    }
    function stringTypeAnnotation() {
      return {
        type: "StringTypeAnnotation"
      };
    }
    function symbolTypeAnnotation() {
      return {
        type: "SymbolTypeAnnotation"
      };
    }
    function thisTypeAnnotation() {
      return {
        type: "ThisTypeAnnotation"
      };
    }
    function tupleTypeAnnotation(types) {
      return (0, _validateNode.default)({
        type: "TupleTypeAnnotation",
        types
      });
    }
    function typeofTypeAnnotation(argument) {
      return (0, _validateNode.default)({
        type: "TypeofTypeAnnotation",
        argument
      });
    }
    function typeAlias(id, typeParameters = null, right) {
      return (0, _validateNode.default)({
        type: "TypeAlias",
        id,
        typeParameters,
        right
      });
    }
    function typeAnnotation(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TypeAnnotation",
        typeAnnotation: typeAnnotation2
      });
    }
    function typeCastExpression(expression, typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TypeCastExpression",
        expression,
        typeAnnotation: typeAnnotation2
      });
    }
    function typeParameter(bound = null, _default = null, variance2 = null) {
      return (0, _validateNode.default)({
        type: "TypeParameter",
        bound,
        default: _default,
        variance: variance2,
        name: null
      });
    }
    function typeParameterDeclaration(params) {
      return (0, _validateNode.default)({
        type: "TypeParameterDeclaration",
        params
      });
    }
    function typeParameterInstantiation(params) {
      return (0, _validateNode.default)({
        type: "TypeParameterInstantiation",
        params
      });
    }
    function unionTypeAnnotation(types) {
      return (0, _validateNode.default)({
        type: "UnionTypeAnnotation",
        types
      });
    }
    function variance(kind) {
      return (0, _validateNode.default)({
        type: "Variance",
        kind
      });
    }
    function voidTypeAnnotation() {
      return {
        type: "VoidTypeAnnotation"
      };
    }
    function enumDeclaration(id, body) {
      return (0, _validateNode.default)({
        type: "EnumDeclaration",
        id,
        body
      });
    }
    function enumBooleanBody(members) {
      return (0, _validateNode.default)({
        type: "EnumBooleanBody",
        members,
        explicitType: null,
        hasUnknownMembers: null
      });
    }
    function enumNumberBody(members) {
      return (0, _validateNode.default)({
        type: "EnumNumberBody",
        members,
        explicitType: null,
        hasUnknownMembers: null
      });
    }
    function enumStringBody(members) {
      return (0, _validateNode.default)({
        type: "EnumStringBody",
        members,
        explicitType: null,
        hasUnknownMembers: null
      });
    }
    function enumSymbolBody(members) {
      return (0, _validateNode.default)({
        type: "EnumSymbolBody",
        members,
        hasUnknownMembers: null
      });
    }
    function enumBooleanMember(id) {
      return (0, _validateNode.default)({
        type: "EnumBooleanMember",
        id,
        init: null
      });
    }
    function enumNumberMember(id, init) {
      return (0, _validateNode.default)({
        type: "EnumNumberMember",
        id,
        init
      });
    }
    function enumStringMember(id, init) {
      return (0, _validateNode.default)({
        type: "EnumStringMember",
        id,
        init
      });
    }
    function enumDefaultedMember(id) {
      return (0, _validateNode.default)({
        type: "EnumDefaultedMember",
        id
      });
    }
    function indexedAccessType(objectType, indexType) {
      return (0, _validateNode.default)({
        type: "IndexedAccessType",
        objectType,
        indexType
      });
    }
    function optionalIndexedAccessType(objectType, indexType) {
      return (0, _validateNode.default)({
        type: "OptionalIndexedAccessType",
        objectType,
        indexType,
        optional: null
      });
    }
    function jsxAttribute(name, value = null) {
      return (0, _validateNode.default)({
        type: "JSXAttribute",
        name,
        value
      });
    }
    function jsxClosingElement(name) {
      return (0, _validateNode.default)({
        type: "JSXClosingElement",
        name
      });
    }
    function jsxElement(openingElement, closingElement = null, children, selfClosing = null) {
      return (0, _validateNode.default)({
        type: "JSXElement",
        openingElement,
        closingElement,
        children,
        selfClosing
      });
    }
    function jsxEmptyExpression() {
      return {
        type: "JSXEmptyExpression"
      };
    }
    function jsxExpressionContainer(expression) {
      return (0, _validateNode.default)({
        type: "JSXExpressionContainer",
        expression
      });
    }
    function jsxSpreadChild(expression) {
      return (0, _validateNode.default)({
        type: "JSXSpreadChild",
        expression
      });
    }
    function jsxIdentifier(name) {
      return (0, _validateNode.default)({
        type: "JSXIdentifier",
        name
      });
    }
    function jsxMemberExpression(object, property) {
      return (0, _validateNode.default)({
        type: "JSXMemberExpression",
        object,
        property
      });
    }
    function jsxNamespacedName(namespace, name) {
      return (0, _validateNode.default)({
        type: "JSXNamespacedName",
        namespace,
        name
      });
    }
    function jsxOpeningElement(name, attributes, selfClosing = false) {
      return (0, _validateNode.default)({
        type: "JSXOpeningElement",
        name,
        attributes,
        selfClosing
      });
    }
    function jsxSpreadAttribute(argument) {
      return (0, _validateNode.default)({
        type: "JSXSpreadAttribute",
        argument
      });
    }
    function jsxText(value) {
      return (0, _validateNode.default)({
        type: "JSXText",
        value
      });
    }
    function jsxFragment(openingFragment, closingFragment, children) {
      return (0, _validateNode.default)({
        type: "JSXFragment",
        openingFragment,
        closingFragment,
        children
      });
    }
    function jsxOpeningFragment() {
      return {
        type: "JSXOpeningFragment"
      };
    }
    function jsxClosingFragment() {
      return {
        type: "JSXClosingFragment"
      };
    }
    function noop() {
      return {
        type: "Noop"
      };
    }
    function placeholder(expectedNode, name) {
      return (0, _validateNode.default)({
        type: "Placeholder",
        expectedNode,
        name
      });
    }
    function v8IntrinsicIdentifier(name) {
      return (0, _validateNode.default)({
        type: "V8IntrinsicIdentifier",
        name
      });
    }
    function argumentPlaceholder() {
      return {
        type: "ArgumentPlaceholder"
      };
    }
    function bindExpression(object, callee) {
      return (0, _validateNode.default)({
        type: "BindExpression",
        object,
        callee
      });
    }
    function importAttribute(key, value) {
      return (0, _validateNode.default)({
        type: "ImportAttribute",
        key,
        value
      });
    }
    function decorator(expression) {
      return (0, _validateNode.default)({
        type: "Decorator",
        expression
      });
    }
    function doExpression(body, async = false) {
      return (0, _validateNode.default)({
        type: "DoExpression",
        body,
        async
      });
    }
    function exportDefaultSpecifier(exported) {
      return (0, _validateNode.default)({
        type: "ExportDefaultSpecifier",
        exported
      });
    }
    function recordExpression(properties) {
      return (0, _validateNode.default)({
        type: "RecordExpression",
        properties
      });
    }
    function tupleExpression(elements = []) {
      return (0, _validateNode.default)({
        type: "TupleExpression",
        elements
      });
    }
    function decimalLiteral(value) {
      return (0, _validateNode.default)({
        type: "DecimalLiteral",
        value
      });
    }
    function moduleExpression(body) {
      return (0, _validateNode.default)({
        type: "ModuleExpression",
        body
      });
    }
    function topicReference() {
      return {
        type: "TopicReference"
      };
    }
    function pipelineTopicExpression(expression) {
      return (0, _validateNode.default)({
        type: "PipelineTopicExpression",
        expression
      });
    }
    function pipelineBareFunction(callee) {
      return (0, _validateNode.default)({
        type: "PipelineBareFunction",
        callee
      });
    }
    function pipelinePrimaryTopicReference() {
      return {
        type: "PipelinePrimaryTopicReference"
      };
    }
    function tsParameterProperty(parameter) {
      return (0, _validateNode.default)({
        type: "TSParameterProperty",
        parameter
      });
    }
    function tsDeclareFunction(id = null, typeParameters = null, params, returnType = null) {
      return (0, _validateNode.default)({
        type: "TSDeclareFunction",
        id,
        typeParameters,
        params,
        returnType
      });
    }
    function tsDeclareMethod(decorators = null, key, typeParameters = null, params, returnType = null) {
      return (0, _validateNode.default)({
        type: "TSDeclareMethod",
        decorators,
        key,
        typeParameters,
        params,
        returnType
      });
    }
    function tsQualifiedName(left, right) {
      return (0, _validateNode.default)({
        type: "TSQualifiedName",
        left,
        right
      });
    }
    function tsCallSignatureDeclaration(typeParameters = null, parameters, typeAnnotation2 = null) {
      return (0, _validateNode.default)({
        type: "TSCallSignatureDeclaration",
        typeParameters,
        parameters,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsConstructSignatureDeclaration(typeParameters = null, parameters, typeAnnotation2 = null) {
      return (0, _validateNode.default)({
        type: "TSConstructSignatureDeclaration",
        typeParameters,
        parameters,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsPropertySignature(key, typeAnnotation2 = null) {
      return (0, _validateNode.default)({
        type: "TSPropertySignature",
        key,
        typeAnnotation: typeAnnotation2,
        kind: null
      });
    }
    function tsMethodSignature(key, typeParameters = null, parameters, typeAnnotation2 = null) {
      return (0, _validateNode.default)({
        type: "TSMethodSignature",
        key,
        typeParameters,
        parameters,
        typeAnnotation: typeAnnotation2,
        kind: null
      });
    }
    function tsIndexSignature(parameters, typeAnnotation2 = null) {
      return (0, _validateNode.default)({
        type: "TSIndexSignature",
        parameters,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsAnyKeyword() {
      return {
        type: "TSAnyKeyword"
      };
    }
    function tsBooleanKeyword() {
      return {
        type: "TSBooleanKeyword"
      };
    }
    function tsBigIntKeyword() {
      return {
        type: "TSBigIntKeyword"
      };
    }
    function tsIntrinsicKeyword() {
      return {
        type: "TSIntrinsicKeyword"
      };
    }
    function tsNeverKeyword() {
      return {
        type: "TSNeverKeyword"
      };
    }
    function tsNullKeyword() {
      return {
        type: "TSNullKeyword"
      };
    }
    function tsNumberKeyword() {
      return {
        type: "TSNumberKeyword"
      };
    }
    function tsObjectKeyword() {
      return {
        type: "TSObjectKeyword"
      };
    }
    function tsStringKeyword() {
      return {
        type: "TSStringKeyword"
      };
    }
    function tsSymbolKeyword() {
      return {
        type: "TSSymbolKeyword"
      };
    }
    function tsUndefinedKeyword() {
      return {
        type: "TSUndefinedKeyword"
      };
    }
    function tsUnknownKeyword() {
      return {
        type: "TSUnknownKeyword"
      };
    }
    function tsVoidKeyword() {
      return {
        type: "TSVoidKeyword"
      };
    }
    function tsThisType() {
      return {
        type: "TSThisType"
      };
    }
    function tsFunctionType(typeParameters = null, parameters, typeAnnotation2 = null) {
      return (0, _validateNode.default)({
        type: "TSFunctionType",
        typeParameters,
        parameters,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsConstructorType(typeParameters = null, parameters, typeAnnotation2 = null) {
      return (0, _validateNode.default)({
        type: "TSConstructorType",
        typeParameters,
        parameters,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsTypeReference(typeName, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "TSTypeReference",
        typeName,
        typeParameters
      });
    }
    function tsTypePredicate(parameterName, typeAnnotation2 = null, asserts = null) {
      return (0, _validateNode.default)({
        type: "TSTypePredicate",
        parameterName,
        typeAnnotation: typeAnnotation2,
        asserts
      });
    }
    function tsTypeQuery(exprName, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "TSTypeQuery",
        exprName,
        typeParameters
      });
    }
    function tsTypeLiteral(members) {
      return (0, _validateNode.default)({
        type: "TSTypeLiteral",
        members
      });
    }
    function tsArrayType(elementType) {
      return (0, _validateNode.default)({
        type: "TSArrayType",
        elementType
      });
    }
    function tsTupleType(elementTypes) {
      return (0, _validateNode.default)({
        type: "TSTupleType",
        elementTypes
      });
    }
    function tsOptionalType(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSOptionalType",
        typeAnnotation: typeAnnotation2
      });
    }
    function tsRestType(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSRestType",
        typeAnnotation: typeAnnotation2
      });
    }
    function tsNamedTupleMember(label, elementType, optional2 = false) {
      return (0, _validateNode.default)({
        type: "TSNamedTupleMember",
        label,
        elementType,
        optional: optional2
      });
    }
    function tsUnionType(types) {
      return (0, _validateNode.default)({
        type: "TSUnionType",
        types
      });
    }
    function tsIntersectionType(types) {
      return (0, _validateNode.default)({
        type: "TSIntersectionType",
        types
      });
    }
    function tsConditionalType(checkType, extendsType, trueType, falseType) {
      return (0, _validateNode.default)({
        type: "TSConditionalType",
        checkType,
        extendsType,
        trueType,
        falseType
      });
    }
    function tsInferType(typeParameter2) {
      return (0, _validateNode.default)({
        type: "TSInferType",
        typeParameter: typeParameter2
      });
    }
    function tsParenthesizedType(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSParenthesizedType",
        typeAnnotation: typeAnnotation2
      });
    }
    function tsTypeOperator(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSTypeOperator",
        typeAnnotation: typeAnnotation2,
        operator: null
      });
    }
    function tsIndexedAccessType(objectType, indexType) {
      return (0, _validateNode.default)({
        type: "TSIndexedAccessType",
        objectType,
        indexType
      });
    }
    function tsMappedType(typeParameter2, typeAnnotation2 = null, nameType = null) {
      return (0, _validateNode.default)({
        type: "TSMappedType",
        typeParameter: typeParameter2,
        typeAnnotation: typeAnnotation2,
        nameType
      });
    }
    function tsLiteralType(literal) {
      return (0, _validateNode.default)({
        type: "TSLiteralType",
        literal
      });
    }
    function tsExpressionWithTypeArguments(expression, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "TSExpressionWithTypeArguments",
        expression,
        typeParameters
      });
    }
    function tsInterfaceDeclaration(id, typeParameters = null, _extends = null, body) {
      return (0, _validateNode.default)({
        type: "TSInterfaceDeclaration",
        id,
        typeParameters,
        extends: _extends,
        body
      });
    }
    function tsInterfaceBody(body) {
      return (0, _validateNode.default)({
        type: "TSInterfaceBody",
        body
      });
    }
    function tsTypeAliasDeclaration(id, typeParameters = null, typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSTypeAliasDeclaration",
        id,
        typeParameters,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsInstantiationExpression(expression, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "TSInstantiationExpression",
        expression,
        typeParameters
      });
    }
    function tsAsExpression(expression, typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSAsExpression",
        expression,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsSatisfiesExpression(expression, typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSSatisfiesExpression",
        expression,
        typeAnnotation: typeAnnotation2
      });
    }
    function tsTypeAssertion(typeAnnotation2, expression) {
      return (0, _validateNode.default)({
        type: "TSTypeAssertion",
        typeAnnotation: typeAnnotation2,
        expression
      });
    }
    function tsEnumDeclaration(id, members) {
      return (0, _validateNode.default)({
        type: "TSEnumDeclaration",
        id,
        members
      });
    }
    function tsEnumMember(id, initializer = null) {
      return (0, _validateNode.default)({
        type: "TSEnumMember",
        id,
        initializer
      });
    }
    function tsModuleDeclaration(id, body) {
      return (0, _validateNode.default)({
        type: "TSModuleDeclaration",
        id,
        body
      });
    }
    function tsModuleBlock(body) {
      return (0, _validateNode.default)({
        type: "TSModuleBlock",
        body
      });
    }
    function tsImportType(argument, qualifier = null, typeParameters = null) {
      return (0, _validateNode.default)({
        type: "TSImportType",
        argument,
        qualifier,
        typeParameters
      });
    }
    function tsImportEqualsDeclaration(id, moduleReference) {
      return (0, _validateNode.default)({
        type: "TSImportEqualsDeclaration",
        id,
        moduleReference,
        isExport: null
      });
    }
    function tsExternalModuleReference(expression) {
      return (0, _validateNode.default)({
        type: "TSExternalModuleReference",
        expression
      });
    }
    function tsNonNullExpression(expression) {
      return (0, _validateNode.default)({
        type: "TSNonNullExpression",
        expression
      });
    }
    function tsExportAssignment(expression) {
      return (0, _validateNode.default)({
        type: "TSExportAssignment",
        expression
      });
    }
    function tsNamespaceExportDeclaration(id) {
      return (0, _validateNode.default)({
        type: "TSNamespaceExportDeclaration",
        id
      });
    }
    function tsTypeAnnotation(typeAnnotation2) {
      return (0, _validateNode.default)({
        type: "TSTypeAnnotation",
        typeAnnotation: typeAnnotation2
      });
    }
    function tsTypeParameterInstantiation(params) {
      return (0, _validateNode.default)({
        type: "TSTypeParameterInstantiation",
        params
      });
    }
    function tsTypeParameterDeclaration(params) {
      return (0, _validateNode.default)({
        type: "TSTypeParameterDeclaration",
        params
      });
    }
    function tsTypeParameter(constraint = null, _default = null, name) {
      return (0, _validateNode.default)({
        type: "TSTypeParameter",
        constraint,
        default: _default,
        name
      });
    }
    function NumberLiteral(value) {
      (0, _deprecationWarning.default)("NumberLiteral", "NumericLiteral", "The node type ");
      return numericLiteral(value);
    }
    function RegexLiteral(pattern, flags = "") {
      (0, _deprecationWarning.default)("RegexLiteral", "RegExpLiteral", "The node type ");
      return regExpLiteral(pattern, flags);
    }
    function RestProperty(argument) {
      (0, _deprecationWarning.default)("RestProperty", "RestElement", "The node type ");
      return restElement(argument);
    }
    function SpreadProperty(argument) {
      (0, _deprecationWarning.default)("SpreadProperty", "SpreadElement", "The node type ");
      return spreadElement(argument);
    }
  }
});

// node_modules/@babel/types/lib/utils/react/cleanJSXElementLiteralChild.js
var require_cleanJSXElementLiteralChild = __commonJS({
  "node_modules/@babel/types/lib/utils/react/cleanJSXElementLiteralChild.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = cleanJSXElementLiteralChild;
    var _index = require_generated2();
    var _index2 = require_lib3();
    function cleanJSXElementLiteralChild(child, args) {
      const lines = child.value.split(/\r\n|\n|\r/);
      let lastNonEmptyLine = 0;
      for (let i = 0; i < lines.length; i++) {
        if (/[^ \t]/.exec(lines[i])) {
          lastNonEmptyLine = i;
        }
      }
      let str = "";
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isFirstLine = i === 0;
        const isLastLine = i === lines.length - 1;
        const isLastNonEmptyLine = i === lastNonEmptyLine;
        let trimmedLine = line.replace(/\t/g, " ");
        if (!isFirstLine) {
          trimmedLine = trimmedLine.replace(/^ +/, "");
        }
        if (!isLastLine) {
          trimmedLine = trimmedLine.replace(/ +$/, "");
        }
        if (trimmedLine) {
          if (!isLastNonEmptyLine) {
            trimmedLine += " ";
          }
          str += trimmedLine;
        }
      }
      if (str) args.push((0, _index2.inherits)((0, _index.stringLiteral)(str), child));
    }
  }
});

// node_modules/@babel/types/lib/builders/react/buildChildren.js
var require_buildChildren = __commonJS({
  "node_modules/@babel/types/lib/builders/react/buildChildren.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = buildChildren;
    var _index = require_generated();
    var _cleanJSXElementLiteralChild = require_cleanJSXElementLiteralChild();
    function buildChildren(node) {
      const elements = [];
      for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];
        if ((0, _index.isJSXText)(child)) {
          (0, _cleanJSXElementLiteralChild.default)(child, elements);
          continue;
        }
        if ((0, _index.isJSXExpressionContainer)(child)) child = child.expression;
        if ((0, _index.isJSXEmptyExpression)(child)) continue;
        elements.push(child);
      }
      return elements;
    }
  }
});

// node_modules/@babel/types/lib/validators/isNode.js
var require_isNode = __commonJS({
  "node_modules/@babel/types/lib/validators/isNode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isNode;
    var _index = require_definitions();
    function isNode(node) {
      return !!(node && _index.VISITOR_KEYS[node.type]);
    }
  }
});

// node_modules/@babel/types/lib/asserts/assertNode.js
var require_assertNode = __commonJS({
  "node_modules/@babel/types/lib/asserts/assertNode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = assertNode;
    var _isNode = require_isNode();
    function assertNode(node) {
      if (!(0, _isNode.default)(node)) {
        var _node$type;
        const type = (_node$type = node == null ? void 0 : node.type) != null ? _node$type : JSON.stringify(node);
        throw new TypeError(`Not a valid node of type "${type}"`);
      }
    }
  }
});

// node_modules/@babel/types/lib/asserts/generated/index.js
var require_generated3 = __commonJS({
  "node_modules/@babel/types/lib/asserts/generated/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.assertAccessor = assertAccessor;
    exports.assertAnyTypeAnnotation = assertAnyTypeAnnotation;
    exports.assertArgumentPlaceholder = assertArgumentPlaceholder;
    exports.assertArrayExpression = assertArrayExpression;
    exports.assertArrayPattern = assertArrayPattern;
    exports.assertArrayTypeAnnotation = assertArrayTypeAnnotation;
    exports.assertArrowFunctionExpression = assertArrowFunctionExpression;
    exports.assertAssignmentExpression = assertAssignmentExpression;
    exports.assertAssignmentPattern = assertAssignmentPattern;
    exports.assertAwaitExpression = assertAwaitExpression;
    exports.assertBigIntLiteral = assertBigIntLiteral;
    exports.assertBinary = assertBinary;
    exports.assertBinaryExpression = assertBinaryExpression;
    exports.assertBindExpression = assertBindExpression;
    exports.assertBlock = assertBlock;
    exports.assertBlockParent = assertBlockParent;
    exports.assertBlockStatement = assertBlockStatement;
    exports.assertBooleanLiteral = assertBooleanLiteral;
    exports.assertBooleanLiteralTypeAnnotation = assertBooleanLiteralTypeAnnotation;
    exports.assertBooleanTypeAnnotation = assertBooleanTypeAnnotation;
    exports.assertBreakStatement = assertBreakStatement;
    exports.assertCallExpression = assertCallExpression;
    exports.assertCatchClause = assertCatchClause;
    exports.assertClass = assertClass;
    exports.assertClassAccessorProperty = assertClassAccessorProperty;
    exports.assertClassBody = assertClassBody;
    exports.assertClassDeclaration = assertClassDeclaration;
    exports.assertClassExpression = assertClassExpression;
    exports.assertClassImplements = assertClassImplements;
    exports.assertClassMethod = assertClassMethod;
    exports.assertClassPrivateMethod = assertClassPrivateMethod;
    exports.assertClassPrivateProperty = assertClassPrivateProperty;
    exports.assertClassProperty = assertClassProperty;
    exports.assertCompletionStatement = assertCompletionStatement;
    exports.assertConditional = assertConditional;
    exports.assertConditionalExpression = assertConditionalExpression;
    exports.assertContinueStatement = assertContinueStatement;
    exports.assertDebuggerStatement = assertDebuggerStatement;
    exports.assertDecimalLiteral = assertDecimalLiteral;
    exports.assertDeclaration = assertDeclaration;
    exports.assertDeclareClass = assertDeclareClass;
    exports.assertDeclareExportAllDeclaration = assertDeclareExportAllDeclaration;
    exports.assertDeclareExportDeclaration = assertDeclareExportDeclaration;
    exports.assertDeclareFunction = assertDeclareFunction;
    exports.assertDeclareInterface = assertDeclareInterface;
    exports.assertDeclareModule = assertDeclareModule;
    exports.assertDeclareModuleExports = assertDeclareModuleExports;
    exports.assertDeclareOpaqueType = assertDeclareOpaqueType;
    exports.assertDeclareTypeAlias = assertDeclareTypeAlias;
    exports.assertDeclareVariable = assertDeclareVariable;
    exports.assertDeclaredPredicate = assertDeclaredPredicate;
    exports.assertDecorator = assertDecorator;
    exports.assertDirective = assertDirective;
    exports.assertDirectiveLiteral = assertDirectiveLiteral;
    exports.assertDoExpression = assertDoExpression;
    exports.assertDoWhileStatement = assertDoWhileStatement;
    exports.assertEmptyStatement = assertEmptyStatement;
    exports.assertEmptyTypeAnnotation = assertEmptyTypeAnnotation;
    exports.assertEnumBody = assertEnumBody;
    exports.assertEnumBooleanBody = assertEnumBooleanBody;
    exports.assertEnumBooleanMember = assertEnumBooleanMember;
    exports.assertEnumDeclaration = assertEnumDeclaration;
    exports.assertEnumDefaultedMember = assertEnumDefaultedMember;
    exports.assertEnumMember = assertEnumMember;
    exports.assertEnumNumberBody = assertEnumNumberBody;
    exports.assertEnumNumberMember = assertEnumNumberMember;
    exports.assertEnumStringBody = assertEnumStringBody;
    exports.assertEnumStringMember = assertEnumStringMember;
    exports.assertEnumSymbolBody = assertEnumSymbolBody;
    exports.assertExistsTypeAnnotation = assertExistsTypeAnnotation;
    exports.assertExportAllDeclaration = assertExportAllDeclaration;
    exports.assertExportDeclaration = assertExportDeclaration;
    exports.assertExportDefaultDeclaration = assertExportDefaultDeclaration;
    exports.assertExportDefaultSpecifier = assertExportDefaultSpecifier;
    exports.assertExportNamedDeclaration = assertExportNamedDeclaration;
    exports.assertExportNamespaceSpecifier = assertExportNamespaceSpecifier;
    exports.assertExportSpecifier = assertExportSpecifier;
    exports.assertExpression = assertExpression;
    exports.assertExpressionStatement = assertExpressionStatement;
    exports.assertExpressionWrapper = assertExpressionWrapper;
    exports.assertFile = assertFile;
    exports.assertFlow = assertFlow;
    exports.assertFlowBaseAnnotation = assertFlowBaseAnnotation;
    exports.assertFlowDeclaration = assertFlowDeclaration;
    exports.assertFlowPredicate = assertFlowPredicate;
    exports.assertFlowType = assertFlowType;
    exports.assertFor = assertFor;
    exports.assertForInStatement = assertForInStatement;
    exports.assertForOfStatement = assertForOfStatement;
    exports.assertForStatement = assertForStatement;
    exports.assertForXStatement = assertForXStatement;
    exports.assertFunction = assertFunction;
    exports.assertFunctionDeclaration = assertFunctionDeclaration;
    exports.assertFunctionExpression = assertFunctionExpression;
    exports.assertFunctionParent = assertFunctionParent;
    exports.assertFunctionTypeAnnotation = assertFunctionTypeAnnotation;
    exports.assertFunctionTypeParam = assertFunctionTypeParam;
    exports.assertGenericTypeAnnotation = assertGenericTypeAnnotation;
    exports.assertIdentifier = assertIdentifier;
    exports.assertIfStatement = assertIfStatement;
    exports.assertImmutable = assertImmutable;
    exports.assertImport = assertImport;
    exports.assertImportAttribute = assertImportAttribute;
    exports.assertImportDeclaration = assertImportDeclaration;
    exports.assertImportDefaultSpecifier = assertImportDefaultSpecifier;
    exports.assertImportExpression = assertImportExpression;
    exports.assertImportNamespaceSpecifier = assertImportNamespaceSpecifier;
    exports.assertImportOrExportDeclaration = assertImportOrExportDeclaration;
    exports.assertImportSpecifier = assertImportSpecifier;
    exports.assertIndexedAccessType = assertIndexedAccessType;
    exports.assertInferredPredicate = assertInferredPredicate;
    exports.assertInterfaceDeclaration = assertInterfaceDeclaration;
    exports.assertInterfaceExtends = assertInterfaceExtends;
    exports.assertInterfaceTypeAnnotation = assertInterfaceTypeAnnotation;
    exports.assertInterpreterDirective = assertInterpreterDirective;
    exports.assertIntersectionTypeAnnotation = assertIntersectionTypeAnnotation;
    exports.assertJSX = assertJSX;
    exports.assertJSXAttribute = assertJSXAttribute;
    exports.assertJSXClosingElement = assertJSXClosingElement;
    exports.assertJSXClosingFragment = assertJSXClosingFragment;
    exports.assertJSXElement = assertJSXElement;
    exports.assertJSXEmptyExpression = assertJSXEmptyExpression;
    exports.assertJSXExpressionContainer = assertJSXExpressionContainer;
    exports.assertJSXFragment = assertJSXFragment;
    exports.assertJSXIdentifier = assertJSXIdentifier;
    exports.assertJSXMemberExpression = assertJSXMemberExpression;
    exports.assertJSXNamespacedName = assertJSXNamespacedName;
    exports.assertJSXOpeningElement = assertJSXOpeningElement;
    exports.assertJSXOpeningFragment = assertJSXOpeningFragment;
    exports.assertJSXSpreadAttribute = assertJSXSpreadAttribute;
    exports.assertJSXSpreadChild = assertJSXSpreadChild;
    exports.assertJSXText = assertJSXText;
    exports.assertLVal = assertLVal;
    exports.assertLabeledStatement = assertLabeledStatement;
    exports.assertLiteral = assertLiteral;
    exports.assertLogicalExpression = assertLogicalExpression;
    exports.assertLoop = assertLoop;
    exports.assertMemberExpression = assertMemberExpression;
    exports.assertMetaProperty = assertMetaProperty;
    exports.assertMethod = assertMethod;
    exports.assertMiscellaneous = assertMiscellaneous;
    exports.assertMixedTypeAnnotation = assertMixedTypeAnnotation;
    exports.assertModuleDeclaration = assertModuleDeclaration;
    exports.assertModuleExpression = assertModuleExpression;
    exports.assertModuleSpecifier = assertModuleSpecifier;
    exports.assertNewExpression = assertNewExpression;
    exports.assertNoop = assertNoop;
    exports.assertNullLiteral = assertNullLiteral;
    exports.assertNullLiteralTypeAnnotation = assertNullLiteralTypeAnnotation;
    exports.assertNullableTypeAnnotation = assertNullableTypeAnnotation;
    exports.assertNumberLiteral = assertNumberLiteral;
    exports.assertNumberLiteralTypeAnnotation = assertNumberLiteralTypeAnnotation;
    exports.assertNumberTypeAnnotation = assertNumberTypeAnnotation;
    exports.assertNumericLiteral = assertNumericLiteral;
    exports.assertObjectExpression = assertObjectExpression;
    exports.assertObjectMember = assertObjectMember;
    exports.assertObjectMethod = assertObjectMethod;
    exports.assertObjectPattern = assertObjectPattern;
    exports.assertObjectProperty = assertObjectProperty;
    exports.assertObjectTypeAnnotation = assertObjectTypeAnnotation;
    exports.assertObjectTypeCallProperty = assertObjectTypeCallProperty;
    exports.assertObjectTypeIndexer = assertObjectTypeIndexer;
    exports.assertObjectTypeInternalSlot = assertObjectTypeInternalSlot;
    exports.assertObjectTypeProperty = assertObjectTypeProperty;
    exports.assertObjectTypeSpreadProperty = assertObjectTypeSpreadProperty;
    exports.assertOpaqueType = assertOpaqueType;
    exports.assertOptionalCallExpression = assertOptionalCallExpression;
    exports.assertOptionalIndexedAccessType = assertOptionalIndexedAccessType;
    exports.assertOptionalMemberExpression = assertOptionalMemberExpression;
    exports.assertParenthesizedExpression = assertParenthesizedExpression;
    exports.assertPattern = assertPattern;
    exports.assertPatternLike = assertPatternLike;
    exports.assertPipelineBareFunction = assertPipelineBareFunction;
    exports.assertPipelinePrimaryTopicReference = assertPipelinePrimaryTopicReference;
    exports.assertPipelineTopicExpression = assertPipelineTopicExpression;
    exports.assertPlaceholder = assertPlaceholder;
    exports.assertPrivate = assertPrivate;
    exports.assertPrivateName = assertPrivateName;
    exports.assertProgram = assertProgram;
    exports.assertProperty = assertProperty;
    exports.assertPureish = assertPureish;
    exports.assertQualifiedTypeIdentifier = assertQualifiedTypeIdentifier;
    exports.assertRecordExpression = assertRecordExpression;
    exports.assertRegExpLiteral = assertRegExpLiteral;
    exports.assertRegexLiteral = assertRegexLiteral;
    exports.assertRestElement = assertRestElement;
    exports.assertRestProperty = assertRestProperty;
    exports.assertReturnStatement = assertReturnStatement;
    exports.assertScopable = assertScopable;
    exports.assertSequenceExpression = assertSequenceExpression;
    exports.assertSpreadElement = assertSpreadElement;
    exports.assertSpreadProperty = assertSpreadProperty;
    exports.assertStandardized = assertStandardized;
    exports.assertStatement = assertStatement;
    exports.assertStaticBlock = assertStaticBlock;
    exports.assertStringLiteral = assertStringLiteral;
    exports.assertStringLiteralTypeAnnotation = assertStringLiteralTypeAnnotation;
    exports.assertStringTypeAnnotation = assertStringTypeAnnotation;
    exports.assertSuper = assertSuper;
    exports.assertSwitchCase = assertSwitchCase;
    exports.assertSwitchStatement = assertSwitchStatement;
    exports.assertSymbolTypeAnnotation = assertSymbolTypeAnnotation;
    exports.assertTSAnyKeyword = assertTSAnyKeyword;
    exports.assertTSArrayType = assertTSArrayType;
    exports.assertTSAsExpression = assertTSAsExpression;
    exports.assertTSBaseType = assertTSBaseType;
    exports.assertTSBigIntKeyword = assertTSBigIntKeyword;
    exports.assertTSBooleanKeyword = assertTSBooleanKeyword;
    exports.assertTSCallSignatureDeclaration = assertTSCallSignatureDeclaration;
    exports.assertTSConditionalType = assertTSConditionalType;
    exports.assertTSConstructSignatureDeclaration = assertTSConstructSignatureDeclaration;
    exports.assertTSConstructorType = assertTSConstructorType;
    exports.assertTSDeclareFunction = assertTSDeclareFunction;
    exports.assertTSDeclareMethod = assertTSDeclareMethod;
    exports.assertTSEntityName = assertTSEntityName;
    exports.assertTSEnumDeclaration = assertTSEnumDeclaration;
    exports.assertTSEnumMember = assertTSEnumMember;
    exports.assertTSExportAssignment = assertTSExportAssignment;
    exports.assertTSExpressionWithTypeArguments = assertTSExpressionWithTypeArguments;
    exports.assertTSExternalModuleReference = assertTSExternalModuleReference;
    exports.assertTSFunctionType = assertTSFunctionType;
    exports.assertTSImportEqualsDeclaration = assertTSImportEqualsDeclaration;
    exports.assertTSImportType = assertTSImportType;
    exports.assertTSIndexSignature = assertTSIndexSignature;
    exports.assertTSIndexedAccessType = assertTSIndexedAccessType;
    exports.assertTSInferType = assertTSInferType;
    exports.assertTSInstantiationExpression = assertTSInstantiationExpression;
    exports.assertTSInterfaceBody = assertTSInterfaceBody;
    exports.assertTSInterfaceDeclaration = assertTSInterfaceDeclaration;
    exports.assertTSIntersectionType = assertTSIntersectionType;
    exports.assertTSIntrinsicKeyword = assertTSIntrinsicKeyword;
    exports.assertTSLiteralType = assertTSLiteralType;
    exports.assertTSMappedType = assertTSMappedType;
    exports.assertTSMethodSignature = assertTSMethodSignature;
    exports.assertTSModuleBlock = assertTSModuleBlock;
    exports.assertTSModuleDeclaration = assertTSModuleDeclaration;
    exports.assertTSNamedTupleMember = assertTSNamedTupleMember;
    exports.assertTSNamespaceExportDeclaration = assertTSNamespaceExportDeclaration;
    exports.assertTSNeverKeyword = assertTSNeverKeyword;
    exports.assertTSNonNullExpression = assertTSNonNullExpression;
    exports.assertTSNullKeyword = assertTSNullKeyword;
    exports.assertTSNumberKeyword = assertTSNumberKeyword;
    exports.assertTSObjectKeyword = assertTSObjectKeyword;
    exports.assertTSOptionalType = assertTSOptionalType;
    exports.assertTSParameterProperty = assertTSParameterProperty;
    exports.assertTSParenthesizedType = assertTSParenthesizedType;
    exports.assertTSPropertySignature = assertTSPropertySignature;
    exports.assertTSQualifiedName = assertTSQualifiedName;
    exports.assertTSRestType = assertTSRestType;
    exports.assertTSSatisfiesExpression = assertTSSatisfiesExpression;
    exports.assertTSStringKeyword = assertTSStringKeyword;
    exports.assertTSSymbolKeyword = assertTSSymbolKeyword;
    exports.assertTSThisType = assertTSThisType;
    exports.assertTSTupleType = assertTSTupleType;
    exports.assertTSType = assertTSType;
    exports.assertTSTypeAliasDeclaration = assertTSTypeAliasDeclaration;
    exports.assertTSTypeAnnotation = assertTSTypeAnnotation;
    exports.assertTSTypeAssertion = assertTSTypeAssertion;
    exports.assertTSTypeElement = assertTSTypeElement;
    exports.assertTSTypeLiteral = assertTSTypeLiteral;
    exports.assertTSTypeOperator = assertTSTypeOperator;
    exports.assertTSTypeParameter = assertTSTypeParameter;
    exports.assertTSTypeParameterDeclaration = assertTSTypeParameterDeclaration;
    exports.assertTSTypeParameterInstantiation = assertTSTypeParameterInstantiation;
    exports.assertTSTypePredicate = assertTSTypePredicate;
    exports.assertTSTypeQuery = assertTSTypeQuery;
    exports.assertTSTypeReference = assertTSTypeReference;
    exports.assertTSUndefinedKeyword = assertTSUndefinedKeyword;
    exports.assertTSUnionType = assertTSUnionType;
    exports.assertTSUnknownKeyword = assertTSUnknownKeyword;
    exports.assertTSVoidKeyword = assertTSVoidKeyword;
    exports.assertTaggedTemplateExpression = assertTaggedTemplateExpression;
    exports.assertTemplateElement = assertTemplateElement;
    exports.assertTemplateLiteral = assertTemplateLiteral;
    exports.assertTerminatorless = assertTerminatorless;
    exports.assertThisExpression = assertThisExpression;
    exports.assertThisTypeAnnotation = assertThisTypeAnnotation;
    exports.assertThrowStatement = assertThrowStatement;
    exports.assertTopicReference = assertTopicReference;
    exports.assertTryStatement = assertTryStatement;
    exports.assertTupleExpression = assertTupleExpression;
    exports.assertTupleTypeAnnotation = assertTupleTypeAnnotation;
    exports.assertTypeAlias = assertTypeAlias;
    exports.assertTypeAnnotation = assertTypeAnnotation;
    exports.assertTypeCastExpression = assertTypeCastExpression;
    exports.assertTypeParameter = assertTypeParameter;
    exports.assertTypeParameterDeclaration = assertTypeParameterDeclaration;
    exports.assertTypeParameterInstantiation = assertTypeParameterInstantiation;
    exports.assertTypeScript = assertTypeScript;
    exports.assertTypeofTypeAnnotation = assertTypeofTypeAnnotation;
    exports.assertUnaryExpression = assertUnaryExpression;
    exports.assertUnaryLike = assertUnaryLike;
    exports.assertUnionTypeAnnotation = assertUnionTypeAnnotation;
    exports.assertUpdateExpression = assertUpdateExpression;
    exports.assertUserWhitespacable = assertUserWhitespacable;
    exports.assertV8IntrinsicIdentifier = assertV8IntrinsicIdentifier;
    exports.assertVariableDeclaration = assertVariableDeclaration;
    exports.assertVariableDeclarator = assertVariableDeclarator;
    exports.assertVariance = assertVariance;
    exports.assertVoidTypeAnnotation = assertVoidTypeAnnotation;
    exports.assertWhile = assertWhile;
    exports.assertWhileStatement = assertWhileStatement;
    exports.assertWithStatement = assertWithStatement;
    exports.assertYieldExpression = assertYieldExpression;
    var _is = require_is();
    var _deprecationWarning = require_deprecationWarning();
    function assert(type, node, opts) {
      if (!(0, _is.default)(type, node, opts)) {
        throw new Error(`Expected type "${type}" with option ${JSON.stringify(opts)}, but instead got "${node.type}".`);
      }
    }
    function assertArrayExpression(node, opts) {
      assert("ArrayExpression", node, opts);
    }
    function assertAssignmentExpression(node, opts) {
      assert("AssignmentExpression", node, opts);
    }
    function assertBinaryExpression(node, opts) {
      assert("BinaryExpression", node, opts);
    }
    function assertInterpreterDirective(node, opts) {
      assert("InterpreterDirective", node, opts);
    }
    function assertDirective(node, opts) {
      assert("Directive", node, opts);
    }
    function assertDirectiveLiteral(node, opts) {
      assert("DirectiveLiteral", node, opts);
    }
    function assertBlockStatement(node, opts) {
      assert("BlockStatement", node, opts);
    }
    function assertBreakStatement(node, opts) {
      assert("BreakStatement", node, opts);
    }
    function assertCallExpression(node, opts) {
      assert("CallExpression", node, opts);
    }
    function assertCatchClause(node, opts) {
      assert("CatchClause", node, opts);
    }
    function assertConditionalExpression(node, opts) {
      assert("ConditionalExpression", node, opts);
    }
    function assertContinueStatement(node, opts) {
      assert("ContinueStatement", node, opts);
    }
    function assertDebuggerStatement(node, opts) {
      assert("DebuggerStatement", node, opts);
    }
    function assertDoWhileStatement(node, opts) {
      assert("DoWhileStatement", node, opts);
    }
    function assertEmptyStatement(node, opts) {
      assert("EmptyStatement", node, opts);
    }
    function assertExpressionStatement(node, opts) {
      assert("ExpressionStatement", node, opts);
    }
    function assertFile(node, opts) {
      assert("File", node, opts);
    }
    function assertForInStatement(node, opts) {
      assert("ForInStatement", node, opts);
    }
    function assertForStatement(node, opts) {
      assert("ForStatement", node, opts);
    }
    function assertFunctionDeclaration(node, opts) {
      assert("FunctionDeclaration", node, opts);
    }
    function assertFunctionExpression(node, opts) {
      assert("FunctionExpression", node, opts);
    }
    function assertIdentifier(node, opts) {
      assert("Identifier", node, opts);
    }
    function assertIfStatement(node, opts) {
      assert("IfStatement", node, opts);
    }
    function assertLabeledStatement(node, opts) {
      assert("LabeledStatement", node, opts);
    }
    function assertStringLiteral(node, opts) {
      assert("StringLiteral", node, opts);
    }
    function assertNumericLiteral(node, opts) {
      assert("NumericLiteral", node, opts);
    }
    function assertNullLiteral(node, opts) {
      assert("NullLiteral", node, opts);
    }
    function assertBooleanLiteral(node, opts) {
      assert("BooleanLiteral", node, opts);
    }
    function assertRegExpLiteral(node, opts) {
      assert("RegExpLiteral", node, opts);
    }
    function assertLogicalExpression(node, opts) {
      assert("LogicalExpression", node, opts);
    }
    function assertMemberExpression(node, opts) {
      assert("MemberExpression", node, opts);
    }
    function assertNewExpression(node, opts) {
      assert("NewExpression", node, opts);
    }
    function assertProgram(node, opts) {
      assert("Program", node, opts);
    }
    function assertObjectExpression(node, opts) {
      assert("ObjectExpression", node, opts);
    }
    function assertObjectMethod(node, opts) {
      assert("ObjectMethod", node, opts);
    }
    function assertObjectProperty(node, opts) {
      assert("ObjectProperty", node, opts);
    }
    function assertRestElement(node, opts) {
      assert("RestElement", node, opts);
    }
    function assertReturnStatement(node, opts) {
      assert("ReturnStatement", node, opts);
    }
    function assertSequenceExpression(node, opts) {
      assert("SequenceExpression", node, opts);
    }
    function assertParenthesizedExpression(node, opts) {
      assert("ParenthesizedExpression", node, opts);
    }
    function assertSwitchCase(node, opts) {
      assert("SwitchCase", node, opts);
    }
    function assertSwitchStatement(node, opts) {
      assert("SwitchStatement", node, opts);
    }
    function assertThisExpression(node, opts) {
      assert("ThisExpression", node, opts);
    }
    function assertThrowStatement(node, opts) {
      assert("ThrowStatement", node, opts);
    }
    function assertTryStatement(node, opts) {
      assert("TryStatement", node, opts);
    }
    function assertUnaryExpression(node, opts) {
      assert("UnaryExpression", node, opts);
    }
    function assertUpdateExpression(node, opts) {
      assert("UpdateExpression", node, opts);
    }
    function assertVariableDeclaration(node, opts) {
      assert("VariableDeclaration", node, opts);
    }
    function assertVariableDeclarator(node, opts) {
      assert("VariableDeclarator", node, opts);
    }
    function assertWhileStatement(node, opts) {
      assert("WhileStatement", node, opts);
    }
    function assertWithStatement(node, opts) {
      assert("WithStatement", node, opts);
    }
    function assertAssignmentPattern(node, opts) {
      assert("AssignmentPattern", node, opts);
    }
    function assertArrayPattern(node, opts) {
      assert("ArrayPattern", node, opts);
    }
    function assertArrowFunctionExpression(node, opts) {
      assert("ArrowFunctionExpression", node, opts);
    }
    function assertClassBody(node, opts) {
      assert("ClassBody", node, opts);
    }
    function assertClassExpression(node, opts) {
      assert("ClassExpression", node, opts);
    }
    function assertClassDeclaration(node, opts) {
      assert("ClassDeclaration", node, opts);
    }
    function assertExportAllDeclaration(node, opts) {
      assert("ExportAllDeclaration", node, opts);
    }
    function assertExportDefaultDeclaration(node, opts) {
      assert("ExportDefaultDeclaration", node, opts);
    }
    function assertExportNamedDeclaration(node, opts) {
      assert("ExportNamedDeclaration", node, opts);
    }
    function assertExportSpecifier(node, opts) {
      assert("ExportSpecifier", node, opts);
    }
    function assertForOfStatement(node, opts) {
      assert("ForOfStatement", node, opts);
    }
    function assertImportDeclaration(node, opts) {
      assert("ImportDeclaration", node, opts);
    }
    function assertImportDefaultSpecifier(node, opts) {
      assert("ImportDefaultSpecifier", node, opts);
    }
    function assertImportNamespaceSpecifier(node, opts) {
      assert("ImportNamespaceSpecifier", node, opts);
    }
    function assertImportSpecifier(node, opts) {
      assert("ImportSpecifier", node, opts);
    }
    function assertImportExpression(node, opts) {
      assert("ImportExpression", node, opts);
    }
    function assertMetaProperty(node, opts) {
      assert("MetaProperty", node, opts);
    }
    function assertClassMethod(node, opts) {
      assert("ClassMethod", node, opts);
    }
    function assertObjectPattern(node, opts) {
      assert("ObjectPattern", node, opts);
    }
    function assertSpreadElement(node, opts) {
      assert("SpreadElement", node, opts);
    }
    function assertSuper(node, opts) {
      assert("Super", node, opts);
    }
    function assertTaggedTemplateExpression(node, opts) {
      assert("TaggedTemplateExpression", node, opts);
    }
    function assertTemplateElement(node, opts) {
      assert("TemplateElement", node, opts);
    }
    function assertTemplateLiteral(node, opts) {
      assert("TemplateLiteral", node, opts);
    }
    function assertYieldExpression(node, opts) {
      assert("YieldExpression", node, opts);
    }
    function assertAwaitExpression(node, opts) {
      assert("AwaitExpression", node, opts);
    }
    function assertImport(node, opts) {
      assert("Import", node, opts);
    }
    function assertBigIntLiteral(node, opts) {
      assert("BigIntLiteral", node, opts);
    }
    function assertExportNamespaceSpecifier(node, opts) {
      assert("ExportNamespaceSpecifier", node, opts);
    }
    function assertOptionalMemberExpression(node, opts) {
      assert("OptionalMemberExpression", node, opts);
    }
    function assertOptionalCallExpression(node, opts) {
      assert("OptionalCallExpression", node, opts);
    }
    function assertClassProperty(node, opts) {
      assert("ClassProperty", node, opts);
    }
    function assertClassAccessorProperty(node, opts) {
      assert("ClassAccessorProperty", node, opts);
    }
    function assertClassPrivateProperty(node, opts) {
      assert("ClassPrivateProperty", node, opts);
    }
    function assertClassPrivateMethod(node, opts) {
      assert("ClassPrivateMethod", node, opts);
    }
    function assertPrivateName(node, opts) {
      assert("PrivateName", node, opts);
    }
    function assertStaticBlock(node, opts) {
      assert("StaticBlock", node, opts);
    }
    function assertAnyTypeAnnotation(node, opts) {
      assert("AnyTypeAnnotation", node, opts);
    }
    function assertArrayTypeAnnotation(node, opts) {
      assert("ArrayTypeAnnotation", node, opts);
    }
    function assertBooleanTypeAnnotation(node, opts) {
      assert("BooleanTypeAnnotation", node, opts);
    }
    function assertBooleanLiteralTypeAnnotation(node, opts) {
      assert("BooleanLiteralTypeAnnotation", node, opts);
    }
    function assertNullLiteralTypeAnnotation(node, opts) {
      assert("NullLiteralTypeAnnotation", node, opts);
    }
    function assertClassImplements(node, opts) {
      assert("ClassImplements", node, opts);
    }
    function assertDeclareClass(node, opts) {
      assert("DeclareClass", node, opts);
    }
    function assertDeclareFunction(node, opts) {
      assert("DeclareFunction", node, opts);
    }
    function assertDeclareInterface(node, opts) {
      assert("DeclareInterface", node, opts);
    }
    function assertDeclareModule(node, opts) {
      assert("DeclareModule", node, opts);
    }
    function assertDeclareModuleExports(node, opts) {
      assert("DeclareModuleExports", node, opts);
    }
    function assertDeclareTypeAlias(node, opts) {
      assert("DeclareTypeAlias", node, opts);
    }
    function assertDeclareOpaqueType(node, opts) {
      assert("DeclareOpaqueType", node, opts);
    }
    function assertDeclareVariable(node, opts) {
      assert("DeclareVariable", node, opts);
    }
    function assertDeclareExportDeclaration(node, opts) {
      assert("DeclareExportDeclaration", node, opts);
    }
    function assertDeclareExportAllDeclaration(node, opts) {
      assert("DeclareExportAllDeclaration", node, opts);
    }
    function assertDeclaredPredicate(node, opts) {
      assert("DeclaredPredicate", node, opts);
    }
    function assertExistsTypeAnnotation(node, opts) {
      assert("ExistsTypeAnnotation", node, opts);
    }
    function assertFunctionTypeAnnotation(node, opts) {
      assert("FunctionTypeAnnotation", node, opts);
    }
    function assertFunctionTypeParam(node, opts) {
      assert("FunctionTypeParam", node, opts);
    }
    function assertGenericTypeAnnotation(node, opts) {
      assert("GenericTypeAnnotation", node, opts);
    }
    function assertInferredPredicate(node, opts) {
      assert("InferredPredicate", node, opts);
    }
    function assertInterfaceExtends(node, opts) {
      assert("InterfaceExtends", node, opts);
    }
    function assertInterfaceDeclaration(node, opts) {
      assert("InterfaceDeclaration", node, opts);
    }
    function assertInterfaceTypeAnnotation(node, opts) {
      assert("InterfaceTypeAnnotation", node, opts);
    }
    function assertIntersectionTypeAnnotation(node, opts) {
      assert("IntersectionTypeAnnotation", node, opts);
    }
    function assertMixedTypeAnnotation(node, opts) {
      assert("MixedTypeAnnotation", node, opts);
    }
    function assertEmptyTypeAnnotation(node, opts) {
      assert("EmptyTypeAnnotation", node, opts);
    }
    function assertNullableTypeAnnotation(node, opts) {
      assert("NullableTypeAnnotation", node, opts);
    }
    function assertNumberLiteralTypeAnnotation(node, opts) {
      assert("NumberLiteralTypeAnnotation", node, opts);
    }
    function assertNumberTypeAnnotation(node, opts) {
      assert("NumberTypeAnnotation", node, opts);
    }
    function assertObjectTypeAnnotation(node, opts) {
      assert("ObjectTypeAnnotation", node, opts);
    }
    function assertObjectTypeInternalSlot(node, opts) {
      assert("ObjectTypeInternalSlot", node, opts);
    }
    function assertObjectTypeCallProperty(node, opts) {
      assert("ObjectTypeCallProperty", node, opts);
    }
    function assertObjectTypeIndexer(node, opts) {
      assert("ObjectTypeIndexer", node, opts);
    }
    function assertObjectTypeProperty(node, opts) {
      assert("ObjectTypeProperty", node, opts);
    }
    function assertObjectTypeSpreadProperty(node, opts) {
      assert("ObjectTypeSpreadProperty", node, opts);
    }
    function assertOpaqueType(node, opts) {
      assert("OpaqueType", node, opts);
    }
    function assertQualifiedTypeIdentifier(node, opts) {
      assert("QualifiedTypeIdentifier", node, opts);
    }
    function assertStringLiteralTypeAnnotation(node, opts) {
      assert("StringLiteralTypeAnnotation", node, opts);
    }
    function assertStringTypeAnnotation(node, opts) {
      assert("StringTypeAnnotation", node, opts);
    }
    function assertSymbolTypeAnnotation(node, opts) {
      assert("SymbolTypeAnnotation", node, opts);
    }
    function assertThisTypeAnnotation(node, opts) {
      assert("ThisTypeAnnotation", node, opts);
    }
    function assertTupleTypeAnnotation(node, opts) {
      assert("TupleTypeAnnotation", node, opts);
    }
    function assertTypeofTypeAnnotation(node, opts) {
      assert("TypeofTypeAnnotation", node, opts);
    }
    function assertTypeAlias(node, opts) {
      assert("TypeAlias", node, opts);
    }
    function assertTypeAnnotation(node, opts) {
      assert("TypeAnnotation", node, opts);
    }
    function assertTypeCastExpression(node, opts) {
      assert("TypeCastExpression", node, opts);
    }
    function assertTypeParameter(node, opts) {
      assert("TypeParameter", node, opts);
    }
    function assertTypeParameterDeclaration(node, opts) {
      assert("TypeParameterDeclaration", node, opts);
    }
    function assertTypeParameterInstantiation(node, opts) {
      assert("TypeParameterInstantiation", node, opts);
    }
    function assertUnionTypeAnnotation(node, opts) {
      assert("UnionTypeAnnotation", node, opts);
    }
    function assertVariance(node, opts) {
      assert("Variance", node, opts);
    }
    function assertVoidTypeAnnotation(node, opts) {
      assert("VoidTypeAnnotation", node, opts);
    }
    function assertEnumDeclaration(node, opts) {
      assert("EnumDeclaration", node, opts);
    }
    function assertEnumBooleanBody(node, opts) {
      assert("EnumBooleanBody", node, opts);
    }
    function assertEnumNumberBody(node, opts) {
      assert("EnumNumberBody", node, opts);
    }
    function assertEnumStringBody(node, opts) {
      assert("EnumStringBody", node, opts);
    }
    function assertEnumSymbolBody(node, opts) {
      assert("EnumSymbolBody", node, opts);
    }
    function assertEnumBooleanMember(node, opts) {
      assert("EnumBooleanMember", node, opts);
    }
    function assertEnumNumberMember(node, opts) {
      assert("EnumNumberMember", node, opts);
    }
    function assertEnumStringMember(node, opts) {
      assert("EnumStringMember", node, opts);
    }
    function assertEnumDefaultedMember(node, opts) {
      assert("EnumDefaultedMember", node, opts);
    }
    function assertIndexedAccessType(node, opts) {
      assert("IndexedAccessType", node, opts);
    }
    function assertOptionalIndexedAccessType(node, opts) {
      assert("OptionalIndexedAccessType", node, opts);
    }
    function assertJSXAttribute(node, opts) {
      assert("JSXAttribute", node, opts);
    }
    function assertJSXClosingElement(node, opts) {
      assert("JSXClosingElement", node, opts);
    }
    function assertJSXElement(node, opts) {
      assert("JSXElement", node, opts);
    }
    function assertJSXEmptyExpression(node, opts) {
      assert("JSXEmptyExpression", node, opts);
    }
    function assertJSXExpressionContainer(node, opts) {
      assert("JSXExpressionContainer", node, opts);
    }
    function assertJSXSpreadChild(node, opts) {
      assert("JSXSpreadChild", node, opts);
    }
    function assertJSXIdentifier(node, opts) {
      assert("JSXIdentifier", node, opts);
    }
    function assertJSXMemberExpression(node, opts) {
      assert("JSXMemberExpression", node, opts);
    }
    function assertJSXNamespacedName(node, opts) {
      assert("JSXNamespacedName", node, opts);
    }
    function assertJSXOpeningElement(node, opts) {
      assert("JSXOpeningElement", node, opts);
    }
    function assertJSXSpreadAttribute(node, opts) {
      assert("JSXSpreadAttribute", node, opts);
    }
    function assertJSXText(node, opts) {
      assert("JSXText", node, opts);
    }
    function assertJSXFragment(node, opts) {
      assert("JSXFragment", node, opts);
    }
    function assertJSXOpeningFragment(node, opts) {
      assert("JSXOpeningFragment", node, opts);
    }
    function assertJSXClosingFragment(node, opts) {
      assert("JSXClosingFragment", node, opts);
    }
    function assertNoop(node, opts) {
      assert("Noop", node, opts);
    }
    function assertPlaceholder(node, opts) {
      assert("Placeholder", node, opts);
    }
    function assertV8IntrinsicIdentifier(node, opts) {
      assert("V8IntrinsicIdentifier", node, opts);
    }
    function assertArgumentPlaceholder(node, opts) {
      assert("ArgumentPlaceholder", node, opts);
    }
    function assertBindExpression(node, opts) {
      assert("BindExpression", node, opts);
    }
    function assertImportAttribute(node, opts) {
      assert("ImportAttribute", node, opts);
    }
    function assertDecorator(node, opts) {
      assert("Decorator", node, opts);
    }
    function assertDoExpression(node, opts) {
      assert("DoExpression", node, opts);
    }
    function assertExportDefaultSpecifier(node, opts) {
      assert("ExportDefaultSpecifier", node, opts);
    }
    function assertRecordExpression(node, opts) {
      assert("RecordExpression", node, opts);
    }
    function assertTupleExpression(node, opts) {
      assert("TupleExpression", node, opts);
    }
    function assertDecimalLiteral(node, opts) {
      assert("DecimalLiteral", node, opts);
    }
    function assertModuleExpression(node, opts) {
      assert("ModuleExpression", node, opts);
    }
    function assertTopicReference(node, opts) {
      assert("TopicReference", node, opts);
    }
    function assertPipelineTopicExpression(node, opts) {
      assert("PipelineTopicExpression", node, opts);
    }
    function assertPipelineBareFunction(node, opts) {
      assert("PipelineBareFunction", node, opts);
    }
    function assertPipelinePrimaryTopicReference(node, opts) {
      assert("PipelinePrimaryTopicReference", node, opts);
    }
    function assertTSParameterProperty(node, opts) {
      assert("TSParameterProperty", node, opts);
    }
    function assertTSDeclareFunction(node, opts) {
      assert("TSDeclareFunction", node, opts);
    }
    function assertTSDeclareMethod(node, opts) {
      assert("TSDeclareMethod", node, opts);
    }
    function assertTSQualifiedName(node, opts) {
      assert("TSQualifiedName", node, opts);
    }
    function assertTSCallSignatureDeclaration(node, opts) {
      assert("TSCallSignatureDeclaration", node, opts);
    }
    function assertTSConstructSignatureDeclaration(node, opts) {
      assert("TSConstructSignatureDeclaration", node, opts);
    }
    function assertTSPropertySignature(node, opts) {
      assert("TSPropertySignature", node, opts);
    }
    function assertTSMethodSignature(node, opts) {
      assert("TSMethodSignature", node, opts);
    }
    function assertTSIndexSignature(node, opts) {
      assert("TSIndexSignature", node, opts);
    }
    function assertTSAnyKeyword(node, opts) {
      assert("TSAnyKeyword", node, opts);
    }
    function assertTSBooleanKeyword(node, opts) {
      assert("TSBooleanKeyword", node, opts);
    }
    function assertTSBigIntKeyword(node, opts) {
      assert("TSBigIntKeyword", node, opts);
    }
    function assertTSIntrinsicKeyword(node, opts) {
      assert("TSIntrinsicKeyword", node, opts);
    }
    function assertTSNeverKeyword(node, opts) {
      assert("TSNeverKeyword", node, opts);
    }
    function assertTSNullKeyword(node, opts) {
      assert("TSNullKeyword", node, opts);
    }
    function assertTSNumberKeyword(node, opts) {
      assert("TSNumberKeyword", node, opts);
    }
    function assertTSObjectKeyword(node, opts) {
      assert("TSObjectKeyword", node, opts);
    }
    function assertTSStringKeyword(node, opts) {
      assert("TSStringKeyword", node, opts);
    }
    function assertTSSymbolKeyword(node, opts) {
      assert("TSSymbolKeyword", node, opts);
    }
    function assertTSUndefinedKeyword(node, opts) {
      assert("TSUndefinedKeyword", node, opts);
    }
    function assertTSUnknownKeyword(node, opts) {
      assert("TSUnknownKeyword", node, opts);
    }
    function assertTSVoidKeyword(node, opts) {
      assert("TSVoidKeyword", node, opts);
    }
    function assertTSThisType(node, opts) {
      assert("TSThisType", node, opts);
    }
    function assertTSFunctionType(node, opts) {
      assert("TSFunctionType", node, opts);
    }
    function assertTSConstructorType(node, opts) {
      assert("TSConstructorType", node, opts);
    }
    function assertTSTypeReference(node, opts) {
      assert("TSTypeReference", node, opts);
    }
    function assertTSTypePredicate(node, opts) {
      assert("TSTypePredicate", node, opts);
    }
    function assertTSTypeQuery(node, opts) {
      assert("TSTypeQuery", node, opts);
    }
    function assertTSTypeLiteral(node, opts) {
      assert("TSTypeLiteral", node, opts);
    }
    function assertTSArrayType(node, opts) {
      assert("TSArrayType", node, opts);
    }
    function assertTSTupleType(node, opts) {
      assert("TSTupleType", node, opts);
    }
    function assertTSOptionalType(node, opts) {
      assert("TSOptionalType", node, opts);
    }
    function assertTSRestType(node, opts) {
      assert("TSRestType", node, opts);
    }
    function assertTSNamedTupleMember(node, opts) {
      assert("TSNamedTupleMember", node, opts);
    }
    function assertTSUnionType(node, opts) {
      assert("TSUnionType", node, opts);
    }
    function assertTSIntersectionType(node, opts) {
      assert("TSIntersectionType", node, opts);
    }
    function assertTSConditionalType(node, opts) {
      assert("TSConditionalType", node, opts);
    }
    function assertTSInferType(node, opts) {
      assert("TSInferType", node, opts);
    }
    function assertTSParenthesizedType(node, opts) {
      assert("TSParenthesizedType", node, opts);
    }
    function assertTSTypeOperator(node, opts) {
      assert("TSTypeOperator", node, opts);
    }
    function assertTSIndexedAccessType(node, opts) {
      assert("TSIndexedAccessType", node, opts);
    }
    function assertTSMappedType(node, opts) {
      assert("TSMappedType", node, opts);
    }
    function assertTSLiteralType(node, opts) {
      assert("TSLiteralType", node, opts);
    }
    function assertTSExpressionWithTypeArguments(node, opts) {
      assert("TSExpressionWithTypeArguments", node, opts);
    }
    function assertTSInterfaceDeclaration(node, opts) {
      assert("TSInterfaceDeclaration", node, opts);
    }
    function assertTSInterfaceBody(node, opts) {
      assert("TSInterfaceBody", node, opts);
    }
    function assertTSTypeAliasDeclaration(node, opts) {
      assert("TSTypeAliasDeclaration", node, opts);
    }
    function assertTSInstantiationExpression(node, opts) {
      assert("TSInstantiationExpression", node, opts);
    }
    function assertTSAsExpression(node, opts) {
      assert("TSAsExpression", node, opts);
    }
    function assertTSSatisfiesExpression(node, opts) {
      assert("TSSatisfiesExpression", node, opts);
    }
    function assertTSTypeAssertion(node, opts) {
      assert("TSTypeAssertion", node, opts);
    }
    function assertTSEnumDeclaration(node, opts) {
      assert("TSEnumDeclaration", node, opts);
    }
    function assertTSEnumMember(node, opts) {
      assert("TSEnumMember", node, opts);
    }
    function assertTSModuleDeclaration(node, opts) {
      assert("TSModuleDeclaration", node, opts);
    }
    function assertTSModuleBlock(node, opts) {
      assert("TSModuleBlock", node, opts);
    }
    function assertTSImportType(node, opts) {
      assert("TSImportType", node, opts);
    }
    function assertTSImportEqualsDeclaration(node, opts) {
      assert("TSImportEqualsDeclaration", node, opts);
    }
    function assertTSExternalModuleReference(node, opts) {
      assert("TSExternalModuleReference", node, opts);
    }
    function assertTSNonNullExpression(node, opts) {
      assert("TSNonNullExpression", node, opts);
    }
    function assertTSExportAssignment(node, opts) {
      assert("TSExportAssignment", node, opts);
    }
    function assertTSNamespaceExportDeclaration(node, opts) {
      assert("TSNamespaceExportDeclaration", node, opts);
    }
    function assertTSTypeAnnotation(node, opts) {
      assert("TSTypeAnnotation", node, opts);
    }
    function assertTSTypeParameterInstantiation(node, opts) {
      assert("TSTypeParameterInstantiation", node, opts);
    }
    function assertTSTypeParameterDeclaration(node, opts) {
      assert("TSTypeParameterDeclaration", node, opts);
    }
    function assertTSTypeParameter(node, opts) {
      assert("TSTypeParameter", node, opts);
    }
    function assertStandardized(node, opts) {
      assert("Standardized", node, opts);
    }
    function assertExpression(node, opts) {
      assert("Expression", node, opts);
    }
    function assertBinary(node, opts) {
      assert("Binary", node, opts);
    }
    function assertScopable(node, opts) {
      assert("Scopable", node, opts);
    }
    function assertBlockParent(node, opts) {
      assert("BlockParent", node, opts);
    }
    function assertBlock(node, opts) {
      assert("Block", node, opts);
    }
    function assertStatement(node, opts) {
      assert("Statement", node, opts);
    }
    function assertTerminatorless(node, opts) {
      assert("Terminatorless", node, opts);
    }
    function assertCompletionStatement(node, opts) {
      assert("CompletionStatement", node, opts);
    }
    function assertConditional(node, opts) {
      assert("Conditional", node, opts);
    }
    function assertLoop(node, opts) {
      assert("Loop", node, opts);
    }
    function assertWhile(node, opts) {
      assert("While", node, opts);
    }
    function assertExpressionWrapper(node, opts) {
      assert("ExpressionWrapper", node, opts);
    }
    function assertFor(node, opts) {
      assert("For", node, opts);
    }
    function assertForXStatement(node, opts) {
      assert("ForXStatement", node, opts);
    }
    function assertFunction(node, opts) {
      assert("Function", node, opts);
    }
    function assertFunctionParent(node, opts) {
      assert("FunctionParent", node, opts);
    }
    function assertPureish(node, opts) {
      assert("Pureish", node, opts);
    }
    function assertDeclaration(node, opts) {
      assert("Declaration", node, opts);
    }
    function assertPatternLike(node, opts) {
      assert("PatternLike", node, opts);
    }
    function assertLVal(node, opts) {
      assert("LVal", node, opts);
    }
    function assertTSEntityName(node, opts) {
      assert("TSEntityName", node, opts);
    }
    function assertLiteral(node, opts) {
      assert("Literal", node, opts);
    }
    function assertImmutable(node, opts) {
      assert("Immutable", node, opts);
    }
    function assertUserWhitespacable(node, opts) {
      assert("UserWhitespacable", node, opts);
    }
    function assertMethod(node, opts) {
      assert("Method", node, opts);
    }
    function assertObjectMember(node, opts) {
      assert("ObjectMember", node, opts);
    }
    function assertProperty(node, opts) {
      assert("Property", node, opts);
    }
    function assertUnaryLike(node, opts) {
      assert("UnaryLike", node, opts);
    }
    function assertPattern(node, opts) {
      assert("Pattern", node, opts);
    }
    function assertClass(node, opts) {
      assert("Class", node, opts);
    }
    function assertImportOrExportDeclaration(node, opts) {
      assert("ImportOrExportDeclaration", node, opts);
    }
    function assertExportDeclaration(node, opts) {
      assert("ExportDeclaration", node, opts);
    }
    function assertModuleSpecifier(node, opts) {
      assert("ModuleSpecifier", node, opts);
    }
    function assertAccessor(node, opts) {
      assert("Accessor", node, opts);
    }
    function assertPrivate(node, opts) {
      assert("Private", node, opts);
    }
    function assertFlow(node, opts) {
      assert("Flow", node, opts);
    }
    function assertFlowType(node, opts) {
      assert("FlowType", node, opts);
    }
    function assertFlowBaseAnnotation(node, opts) {
      assert("FlowBaseAnnotation", node, opts);
    }
    function assertFlowDeclaration(node, opts) {
      assert("FlowDeclaration", node, opts);
    }
    function assertFlowPredicate(node, opts) {
      assert("FlowPredicate", node, opts);
    }
    function assertEnumBody(node, opts) {
      assert("EnumBody", node, opts);
    }
    function assertEnumMember(node, opts) {
      assert("EnumMember", node, opts);
    }
    function assertJSX(node, opts) {
      assert("JSX", node, opts);
    }
    function assertMiscellaneous(node, opts) {
      assert("Miscellaneous", node, opts);
    }
    function assertTypeScript(node, opts) {
      assert("TypeScript", node, opts);
    }
    function assertTSTypeElement(node, opts) {
      assert("TSTypeElement", node, opts);
    }
    function assertTSType(node, opts) {
      assert("TSType", node, opts);
    }
    function assertTSBaseType(node, opts) {
      assert("TSBaseType", node, opts);
    }
    function assertNumberLiteral(node, opts) {
      (0, _deprecationWarning.default)("assertNumberLiteral", "assertNumericLiteral");
      assert("NumberLiteral", node, opts);
    }
    function assertRegexLiteral(node, opts) {
      (0, _deprecationWarning.default)("assertRegexLiteral", "assertRegExpLiteral");
      assert("RegexLiteral", node, opts);
    }
    function assertRestProperty(node, opts) {
      (0, _deprecationWarning.default)("assertRestProperty", "assertRestElement");
      assert("RestProperty", node, opts);
    }
    function assertSpreadProperty(node, opts) {
      (0, _deprecationWarning.default)("assertSpreadProperty", "assertSpreadElement");
      assert("SpreadProperty", node, opts);
    }
    function assertModuleDeclaration(node, opts) {
      (0, _deprecationWarning.default)("assertModuleDeclaration", "assertImportOrExportDeclaration");
      assert("ModuleDeclaration", node, opts);
    }
  }
});

// node_modules/@babel/types/lib/builders/flow/createTypeAnnotationBasedOnTypeof.js
var require_createTypeAnnotationBasedOnTypeof = __commonJS({
  "node_modules/@babel/types/lib/builders/flow/createTypeAnnotationBasedOnTypeof.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _index = require_generated2();
    var _default = exports.default = createTypeAnnotationBasedOnTypeof;
    function createTypeAnnotationBasedOnTypeof(type) {
      switch (type) {
        case "string":
          return (0, _index.stringTypeAnnotation)();
        case "number":
          return (0, _index.numberTypeAnnotation)();
        case "undefined":
          return (0, _index.voidTypeAnnotation)();
        case "boolean":
          return (0, _index.booleanTypeAnnotation)();
        case "function":
          return (0, _index.genericTypeAnnotation)((0, _index.identifier)("Function"));
        case "object":
          return (0, _index.genericTypeAnnotation)((0, _index.identifier)("Object"));
        case "symbol":
          return (0, _index.genericTypeAnnotation)((0, _index.identifier)("Symbol"));
        case "bigint":
          return (0, _index.anyTypeAnnotation)();
      }
      throw new Error("Invalid typeof value: " + type);
    }
  }
});

// node_modules/@babel/types/lib/modifications/flow/removeTypeDuplicates.js
var require_removeTypeDuplicates = __commonJS({
  "node_modules/@babel/types/lib/modifications/flow/removeTypeDuplicates.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = removeTypeDuplicates;
    var _index = require_generated();
    function getQualifiedName(node) {
      return (0, _index.isIdentifier)(node) ? node.name : `${node.id.name}.${getQualifiedName(node.qualification)}`;
    }
    function removeTypeDuplicates(nodesIn) {
      const nodes = Array.from(nodesIn);
      const generics = /* @__PURE__ */ new Map();
      const bases = /* @__PURE__ */ new Map();
      const typeGroups = /* @__PURE__ */ new Set();
      const types = [];
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!node) continue;
        if (types.includes(node)) {
          continue;
        }
        if ((0, _index.isAnyTypeAnnotation)(node)) {
          return [node];
        }
        if ((0, _index.isFlowBaseAnnotation)(node)) {
          bases.set(node.type, node);
          continue;
        }
        if ((0, _index.isUnionTypeAnnotation)(node)) {
          if (!typeGroups.has(node.types)) {
            nodes.push(...node.types);
            typeGroups.add(node.types);
          }
          continue;
        }
        if ((0, _index.isGenericTypeAnnotation)(node)) {
          const name = getQualifiedName(node.id);
          if (generics.has(name)) {
            let existing = generics.get(name);
            if (existing.typeParameters) {
              if (node.typeParameters) {
                existing.typeParameters.params.push(...node.typeParameters.params);
                existing.typeParameters.params = removeTypeDuplicates(existing.typeParameters.params);
              }
            } else {
              existing = node.typeParameters;
            }
          } else {
            generics.set(name, node);
          }
          continue;
        }
        types.push(node);
      }
      for (const [, baseType] of bases) {
        types.push(baseType);
      }
      for (const [, genericName] of generics) {
        types.push(genericName);
      }
      return types;
    }
  }
});

// node_modules/@babel/types/lib/builders/flow/createFlowUnionType.js
var require_createFlowUnionType = __commonJS({
  "node_modules/@babel/types/lib/builders/flow/createFlowUnionType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = createFlowUnionType;
    var _index = require_generated2();
    var _removeTypeDuplicates = require_removeTypeDuplicates();
    function createFlowUnionType(types) {
      const flattened = (0, _removeTypeDuplicates.default)(types);
      if (flattened.length === 1) {
        return flattened[0];
      } else {
        return (0, _index.unionTypeAnnotation)(flattened);
      }
    }
  }
});

// node_modules/@babel/types/lib/modifications/typescript/removeTypeDuplicates.js
var require_removeTypeDuplicates2 = __commonJS({
  "node_modules/@babel/types/lib/modifications/typescript/removeTypeDuplicates.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = removeTypeDuplicates;
    var _index = require_generated();
    function getQualifiedName(node) {
      return (0, _index.isIdentifier)(node) ? node.name : `${node.right.name}.${getQualifiedName(node.left)}`;
    }
    function removeTypeDuplicates(nodesIn) {
      const nodes = Array.from(nodesIn);
      const generics = /* @__PURE__ */ new Map();
      const bases = /* @__PURE__ */ new Map();
      const typeGroups = /* @__PURE__ */ new Set();
      const types = [];
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!node) continue;
        if (types.includes(node)) {
          continue;
        }
        if ((0, _index.isTSAnyKeyword)(node)) {
          return [node];
        }
        if ((0, _index.isTSBaseType)(node)) {
          bases.set(node.type, node);
          continue;
        }
        if ((0, _index.isTSUnionType)(node)) {
          if (!typeGroups.has(node.types)) {
            nodes.push(...node.types);
            typeGroups.add(node.types);
          }
          continue;
        }
        if ((0, _index.isTSTypeReference)(node) && node.typeParameters) {
          const name = getQualifiedName(node.typeName);
          if (generics.has(name)) {
            let existing = generics.get(name);
            if (existing.typeParameters) {
              if (node.typeParameters) {
                existing.typeParameters.params.push(...node.typeParameters.params);
                existing.typeParameters.params = removeTypeDuplicates(existing.typeParameters.params);
              }
            } else {
              existing = node.typeParameters;
            }
          } else {
            generics.set(name, node);
          }
          continue;
        }
        types.push(node);
      }
      for (const [, baseType] of bases) {
        types.push(baseType);
      }
      for (const [, genericName] of generics) {
        types.push(genericName);
      }
      return types;
    }
  }
});

// node_modules/@babel/types/lib/builders/typescript/createTSUnionType.js
var require_createTSUnionType = __commonJS({
  "node_modules/@babel/types/lib/builders/typescript/createTSUnionType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = createTSUnionType;
    var _index = require_generated2();
    var _removeTypeDuplicates = require_removeTypeDuplicates2();
    var _index2 = require_generated();
    function createTSUnionType(typeAnnotations) {
      const types = typeAnnotations.map((type) => {
        return (0, _index2.isTSTypeAnnotation)(type) ? type.typeAnnotation : type;
      });
      const flattened = (0, _removeTypeDuplicates.default)(types);
      if (flattened.length === 1) {
        return flattened[0];
      } else {
        return (0, _index.tsUnionType)(flattened);
      }
    }
  }
});

// node_modules/@babel/types/lib/builders/generated/uppercase.js
var require_uppercase = __commonJS({
  "node_modules/@babel/types/lib/builders/generated/uppercase.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "AnyTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.anyTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "ArgumentPlaceholder", {
      enumerable: true,
      get: function() {
        return _index.argumentPlaceholder;
      }
    });
    Object.defineProperty(exports, "ArrayExpression", {
      enumerable: true,
      get: function() {
        return _index.arrayExpression;
      }
    });
    Object.defineProperty(exports, "ArrayPattern", {
      enumerable: true,
      get: function() {
        return _index.arrayPattern;
      }
    });
    Object.defineProperty(exports, "ArrayTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.arrayTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "ArrowFunctionExpression", {
      enumerable: true,
      get: function() {
        return _index.arrowFunctionExpression;
      }
    });
    Object.defineProperty(exports, "AssignmentExpression", {
      enumerable: true,
      get: function() {
        return _index.assignmentExpression;
      }
    });
    Object.defineProperty(exports, "AssignmentPattern", {
      enumerable: true,
      get: function() {
        return _index.assignmentPattern;
      }
    });
    Object.defineProperty(exports, "AwaitExpression", {
      enumerable: true,
      get: function() {
        return _index.awaitExpression;
      }
    });
    Object.defineProperty(exports, "BigIntLiteral", {
      enumerable: true,
      get: function() {
        return _index.bigIntLiteral;
      }
    });
    Object.defineProperty(exports, "BinaryExpression", {
      enumerable: true,
      get: function() {
        return _index.binaryExpression;
      }
    });
    Object.defineProperty(exports, "BindExpression", {
      enumerable: true,
      get: function() {
        return _index.bindExpression;
      }
    });
    Object.defineProperty(exports, "BlockStatement", {
      enumerable: true,
      get: function() {
        return _index.blockStatement;
      }
    });
    Object.defineProperty(exports, "BooleanLiteral", {
      enumerable: true,
      get: function() {
        return _index.booleanLiteral;
      }
    });
    Object.defineProperty(exports, "BooleanLiteralTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.booleanLiteralTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "BooleanTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.booleanTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "BreakStatement", {
      enumerable: true,
      get: function() {
        return _index.breakStatement;
      }
    });
    Object.defineProperty(exports, "CallExpression", {
      enumerable: true,
      get: function() {
        return _index.callExpression;
      }
    });
    Object.defineProperty(exports, "CatchClause", {
      enumerable: true,
      get: function() {
        return _index.catchClause;
      }
    });
    Object.defineProperty(exports, "ClassAccessorProperty", {
      enumerable: true,
      get: function() {
        return _index.classAccessorProperty;
      }
    });
    Object.defineProperty(exports, "ClassBody", {
      enumerable: true,
      get: function() {
        return _index.classBody;
      }
    });
    Object.defineProperty(exports, "ClassDeclaration", {
      enumerable: true,
      get: function() {
        return _index.classDeclaration;
      }
    });
    Object.defineProperty(exports, "ClassExpression", {
      enumerable: true,
      get: function() {
        return _index.classExpression;
      }
    });
    Object.defineProperty(exports, "ClassImplements", {
      enumerable: true,
      get: function() {
        return _index.classImplements;
      }
    });
    Object.defineProperty(exports, "ClassMethod", {
      enumerable: true,
      get: function() {
        return _index.classMethod;
      }
    });
    Object.defineProperty(exports, "ClassPrivateMethod", {
      enumerable: true,
      get: function() {
        return _index.classPrivateMethod;
      }
    });
    Object.defineProperty(exports, "ClassPrivateProperty", {
      enumerable: true,
      get: function() {
        return _index.classPrivateProperty;
      }
    });
    Object.defineProperty(exports, "ClassProperty", {
      enumerable: true,
      get: function() {
        return _index.classProperty;
      }
    });
    Object.defineProperty(exports, "ConditionalExpression", {
      enumerable: true,
      get: function() {
        return _index.conditionalExpression;
      }
    });
    Object.defineProperty(exports, "ContinueStatement", {
      enumerable: true,
      get: function() {
        return _index.continueStatement;
      }
    });
    Object.defineProperty(exports, "DebuggerStatement", {
      enumerable: true,
      get: function() {
        return _index.debuggerStatement;
      }
    });
    Object.defineProperty(exports, "DecimalLiteral", {
      enumerable: true,
      get: function() {
        return _index.decimalLiteral;
      }
    });
    Object.defineProperty(exports, "DeclareClass", {
      enumerable: true,
      get: function() {
        return _index.declareClass;
      }
    });
    Object.defineProperty(exports, "DeclareExportAllDeclaration", {
      enumerable: true,
      get: function() {
        return _index.declareExportAllDeclaration;
      }
    });
    Object.defineProperty(exports, "DeclareExportDeclaration", {
      enumerable: true,
      get: function() {
        return _index.declareExportDeclaration;
      }
    });
    Object.defineProperty(exports, "DeclareFunction", {
      enumerable: true,
      get: function() {
        return _index.declareFunction;
      }
    });
    Object.defineProperty(exports, "DeclareInterface", {
      enumerable: true,
      get: function() {
        return _index.declareInterface;
      }
    });
    Object.defineProperty(exports, "DeclareModule", {
      enumerable: true,
      get: function() {
        return _index.declareModule;
      }
    });
    Object.defineProperty(exports, "DeclareModuleExports", {
      enumerable: true,
      get: function() {
        return _index.declareModuleExports;
      }
    });
    Object.defineProperty(exports, "DeclareOpaqueType", {
      enumerable: true,
      get: function() {
        return _index.declareOpaqueType;
      }
    });
    Object.defineProperty(exports, "DeclareTypeAlias", {
      enumerable: true,
      get: function() {
        return _index.declareTypeAlias;
      }
    });
    Object.defineProperty(exports, "DeclareVariable", {
      enumerable: true,
      get: function() {
        return _index.declareVariable;
      }
    });
    Object.defineProperty(exports, "DeclaredPredicate", {
      enumerable: true,
      get: function() {
        return _index.declaredPredicate;
      }
    });
    Object.defineProperty(exports, "Decorator", {
      enumerable: true,
      get: function() {
        return _index.decorator;
      }
    });
    Object.defineProperty(exports, "Directive", {
      enumerable: true,
      get: function() {
        return _index.directive;
      }
    });
    Object.defineProperty(exports, "DirectiveLiteral", {
      enumerable: true,
      get: function() {
        return _index.directiveLiteral;
      }
    });
    Object.defineProperty(exports, "DoExpression", {
      enumerable: true,
      get: function() {
        return _index.doExpression;
      }
    });
    Object.defineProperty(exports, "DoWhileStatement", {
      enumerable: true,
      get: function() {
        return _index.doWhileStatement;
      }
    });
    Object.defineProperty(exports, "EmptyStatement", {
      enumerable: true,
      get: function() {
        return _index.emptyStatement;
      }
    });
    Object.defineProperty(exports, "EmptyTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.emptyTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "EnumBooleanBody", {
      enumerable: true,
      get: function() {
        return _index.enumBooleanBody;
      }
    });
    Object.defineProperty(exports, "EnumBooleanMember", {
      enumerable: true,
      get: function() {
        return _index.enumBooleanMember;
      }
    });
    Object.defineProperty(exports, "EnumDeclaration", {
      enumerable: true,
      get: function() {
        return _index.enumDeclaration;
      }
    });
    Object.defineProperty(exports, "EnumDefaultedMember", {
      enumerable: true,
      get: function() {
        return _index.enumDefaultedMember;
      }
    });
    Object.defineProperty(exports, "EnumNumberBody", {
      enumerable: true,
      get: function() {
        return _index.enumNumberBody;
      }
    });
    Object.defineProperty(exports, "EnumNumberMember", {
      enumerable: true,
      get: function() {
        return _index.enumNumberMember;
      }
    });
    Object.defineProperty(exports, "EnumStringBody", {
      enumerable: true,
      get: function() {
        return _index.enumStringBody;
      }
    });
    Object.defineProperty(exports, "EnumStringMember", {
      enumerable: true,
      get: function() {
        return _index.enumStringMember;
      }
    });
    Object.defineProperty(exports, "EnumSymbolBody", {
      enumerable: true,
      get: function() {
        return _index.enumSymbolBody;
      }
    });
    Object.defineProperty(exports, "ExistsTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.existsTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "ExportAllDeclaration", {
      enumerable: true,
      get: function() {
        return _index.exportAllDeclaration;
      }
    });
    Object.defineProperty(exports, "ExportDefaultDeclaration", {
      enumerable: true,
      get: function() {
        return _index.exportDefaultDeclaration;
      }
    });
    Object.defineProperty(exports, "ExportDefaultSpecifier", {
      enumerable: true,
      get: function() {
        return _index.exportDefaultSpecifier;
      }
    });
    Object.defineProperty(exports, "ExportNamedDeclaration", {
      enumerable: true,
      get: function() {
        return _index.exportNamedDeclaration;
      }
    });
    Object.defineProperty(exports, "ExportNamespaceSpecifier", {
      enumerable: true,
      get: function() {
        return _index.exportNamespaceSpecifier;
      }
    });
    Object.defineProperty(exports, "ExportSpecifier", {
      enumerable: true,
      get: function() {
        return _index.exportSpecifier;
      }
    });
    Object.defineProperty(exports, "ExpressionStatement", {
      enumerable: true,
      get: function() {
        return _index.expressionStatement;
      }
    });
    Object.defineProperty(exports, "File", {
      enumerable: true,
      get: function() {
        return _index.file;
      }
    });
    Object.defineProperty(exports, "ForInStatement", {
      enumerable: true,
      get: function() {
        return _index.forInStatement;
      }
    });
    Object.defineProperty(exports, "ForOfStatement", {
      enumerable: true,
      get: function() {
        return _index.forOfStatement;
      }
    });
    Object.defineProperty(exports, "ForStatement", {
      enumerable: true,
      get: function() {
        return _index.forStatement;
      }
    });
    Object.defineProperty(exports, "FunctionDeclaration", {
      enumerable: true,
      get: function() {
        return _index.functionDeclaration;
      }
    });
    Object.defineProperty(exports, "FunctionExpression", {
      enumerable: true,
      get: function() {
        return _index.functionExpression;
      }
    });
    Object.defineProperty(exports, "FunctionTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.functionTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "FunctionTypeParam", {
      enumerable: true,
      get: function() {
        return _index.functionTypeParam;
      }
    });
    Object.defineProperty(exports, "GenericTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.genericTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "Identifier", {
      enumerable: true,
      get: function() {
        return _index.identifier;
      }
    });
    Object.defineProperty(exports, "IfStatement", {
      enumerable: true,
      get: function() {
        return _index.ifStatement;
      }
    });
    Object.defineProperty(exports, "Import", {
      enumerable: true,
      get: function() {
        return _index.import;
      }
    });
    Object.defineProperty(exports, "ImportAttribute", {
      enumerable: true,
      get: function() {
        return _index.importAttribute;
      }
    });
    Object.defineProperty(exports, "ImportDeclaration", {
      enumerable: true,
      get: function() {
        return _index.importDeclaration;
      }
    });
    Object.defineProperty(exports, "ImportDefaultSpecifier", {
      enumerable: true,
      get: function() {
        return _index.importDefaultSpecifier;
      }
    });
    Object.defineProperty(exports, "ImportExpression", {
      enumerable: true,
      get: function() {
        return _index.importExpression;
      }
    });
    Object.defineProperty(exports, "ImportNamespaceSpecifier", {
      enumerable: true,
      get: function() {
        return _index.importNamespaceSpecifier;
      }
    });
    Object.defineProperty(exports, "ImportSpecifier", {
      enumerable: true,
      get: function() {
        return _index.importSpecifier;
      }
    });
    Object.defineProperty(exports, "IndexedAccessType", {
      enumerable: true,
      get: function() {
        return _index.indexedAccessType;
      }
    });
    Object.defineProperty(exports, "InferredPredicate", {
      enumerable: true,
      get: function() {
        return _index.inferredPredicate;
      }
    });
    Object.defineProperty(exports, "InterfaceDeclaration", {
      enumerable: true,
      get: function() {
        return _index.interfaceDeclaration;
      }
    });
    Object.defineProperty(exports, "InterfaceExtends", {
      enumerable: true,
      get: function() {
        return _index.interfaceExtends;
      }
    });
    Object.defineProperty(exports, "InterfaceTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.interfaceTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "InterpreterDirective", {
      enumerable: true,
      get: function() {
        return _index.interpreterDirective;
      }
    });
    Object.defineProperty(exports, "IntersectionTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.intersectionTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "JSXAttribute", {
      enumerable: true,
      get: function() {
        return _index.jsxAttribute;
      }
    });
    Object.defineProperty(exports, "JSXClosingElement", {
      enumerable: true,
      get: function() {
        return _index.jsxClosingElement;
      }
    });
    Object.defineProperty(exports, "JSXClosingFragment", {
      enumerable: true,
      get: function() {
        return _index.jsxClosingFragment;
      }
    });
    Object.defineProperty(exports, "JSXElement", {
      enumerable: true,
      get: function() {
        return _index.jsxElement;
      }
    });
    Object.defineProperty(exports, "JSXEmptyExpression", {
      enumerable: true,
      get: function() {
        return _index.jsxEmptyExpression;
      }
    });
    Object.defineProperty(exports, "JSXExpressionContainer", {
      enumerable: true,
      get: function() {
        return _index.jsxExpressionContainer;
      }
    });
    Object.defineProperty(exports, "JSXFragment", {
      enumerable: true,
      get: function() {
        return _index.jsxFragment;
      }
    });
    Object.defineProperty(exports, "JSXIdentifier", {
      enumerable: true,
      get: function() {
        return _index.jsxIdentifier;
      }
    });
    Object.defineProperty(exports, "JSXMemberExpression", {
      enumerable: true,
      get: function() {
        return _index.jsxMemberExpression;
      }
    });
    Object.defineProperty(exports, "JSXNamespacedName", {
      enumerable: true,
      get: function() {
        return _index.jsxNamespacedName;
      }
    });
    Object.defineProperty(exports, "JSXOpeningElement", {
      enumerable: true,
      get: function() {
        return _index.jsxOpeningElement;
      }
    });
    Object.defineProperty(exports, "JSXOpeningFragment", {
      enumerable: true,
      get: function() {
        return _index.jsxOpeningFragment;
      }
    });
    Object.defineProperty(exports, "JSXSpreadAttribute", {
      enumerable: true,
      get: function() {
        return _index.jsxSpreadAttribute;
      }
    });
    Object.defineProperty(exports, "JSXSpreadChild", {
      enumerable: true,
      get: function() {
        return _index.jsxSpreadChild;
      }
    });
    Object.defineProperty(exports, "JSXText", {
      enumerable: true,
      get: function() {
        return _index.jsxText;
      }
    });
    Object.defineProperty(exports, "LabeledStatement", {
      enumerable: true,
      get: function() {
        return _index.labeledStatement;
      }
    });
    Object.defineProperty(exports, "LogicalExpression", {
      enumerable: true,
      get: function() {
        return _index.logicalExpression;
      }
    });
    Object.defineProperty(exports, "MemberExpression", {
      enumerable: true,
      get: function() {
        return _index.memberExpression;
      }
    });
    Object.defineProperty(exports, "MetaProperty", {
      enumerable: true,
      get: function() {
        return _index.metaProperty;
      }
    });
    Object.defineProperty(exports, "MixedTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.mixedTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "ModuleExpression", {
      enumerable: true,
      get: function() {
        return _index.moduleExpression;
      }
    });
    Object.defineProperty(exports, "NewExpression", {
      enumerable: true,
      get: function() {
        return _index.newExpression;
      }
    });
    Object.defineProperty(exports, "Noop", {
      enumerable: true,
      get: function() {
        return _index.noop;
      }
    });
    Object.defineProperty(exports, "NullLiteral", {
      enumerable: true,
      get: function() {
        return _index.nullLiteral;
      }
    });
    Object.defineProperty(exports, "NullLiteralTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.nullLiteralTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "NullableTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.nullableTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "NumberLiteral", {
      enumerable: true,
      get: function() {
        return _index.numberLiteral;
      }
    });
    Object.defineProperty(exports, "NumberLiteralTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.numberLiteralTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "NumberTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.numberTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "NumericLiteral", {
      enumerable: true,
      get: function() {
        return _index.numericLiteral;
      }
    });
    Object.defineProperty(exports, "ObjectExpression", {
      enumerable: true,
      get: function() {
        return _index.objectExpression;
      }
    });
    Object.defineProperty(exports, "ObjectMethod", {
      enumerable: true,
      get: function() {
        return _index.objectMethod;
      }
    });
    Object.defineProperty(exports, "ObjectPattern", {
      enumerable: true,
      get: function() {
        return _index.objectPattern;
      }
    });
    Object.defineProperty(exports, "ObjectProperty", {
      enumerable: true,
      get: function() {
        return _index.objectProperty;
      }
    });
    Object.defineProperty(exports, "ObjectTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.objectTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "ObjectTypeCallProperty", {
      enumerable: true,
      get: function() {
        return _index.objectTypeCallProperty;
      }
    });
    Object.defineProperty(exports, "ObjectTypeIndexer", {
      enumerable: true,
      get: function() {
        return _index.objectTypeIndexer;
      }
    });
    Object.defineProperty(exports, "ObjectTypeInternalSlot", {
      enumerable: true,
      get: function() {
        return _index.objectTypeInternalSlot;
      }
    });
    Object.defineProperty(exports, "ObjectTypeProperty", {
      enumerable: true,
      get: function() {
        return _index.objectTypeProperty;
      }
    });
    Object.defineProperty(exports, "ObjectTypeSpreadProperty", {
      enumerable: true,
      get: function() {
        return _index.objectTypeSpreadProperty;
      }
    });
    Object.defineProperty(exports, "OpaqueType", {
      enumerable: true,
      get: function() {
        return _index.opaqueType;
      }
    });
    Object.defineProperty(exports, "OptionalCallExpression", {
      enumerable: true,
      get: function() {
        return _index.optionalCallExpression;
      }
    });
    Object.defineProperty(exports, "OptionalIndexedAccessType", {
      enumerable: true,
      get: function() {
        return _index.optionalIndexedAccessType;
      }
    });
    Object.defineProperty(exports, "OptionalMemberExpression", {
      enumerable: true,
      get: function() {
        return _index.optionalMemberExpression;
      }
    });
    Object.defineProperty(exports, "ParenthesizedExpression", {
      enumerable: true,
      get: function() {
        return _index.parenthesizedExpression;
      }
    });
    Object.defineProperty(exports, "PipelineBareFunction", {
      enumerable: true,
      get: function() {
        return _index.pipelineBareFunction;
      }
    });
    Object.defineProperty(exports, "PipelinePrimaryTopicReference", {
      enumerable: true,
      get: function() {
        return _index.pipelinePrimaryTopicReference;
      }
    });
    Object.defineProperty(exports, "PipelineTopicExpression", {
      enumerable: true,
      get: function() {
        return _index.pipelineTopicExpression;
      }
    });
    Object.defineProperty(exports, "Placeholder", {
      enumerable: true,
      get: function() {
        return _index.placeholder;
      }
    });
    Object.defineProperty(exports, "PrivateName", {
      enumerable: true,
      get: function() {
        return _index.privateName;
      }
    });
    Object.defineProperty(exports, "Program", {
      enumerable: true,
      get: function() {
        return _index.program;
      }
    });
    Object.defineProperty(exports, "QualifiedTypeIdentifier", {
      enumerable: true,
      get: function() {
        return _index.qualifiedTypeIdentifier;
      }
    });
    Object.defineProperty(exports, "RecordExpression", {
      enumerable: true,
      get: function() {
        return _index.recordExpression;
      }
    });
    Object.defineProperty(exports, "RegExpLiteral", {
      enumerable: true,
      get: function() {
        return _index.regExpLiteral;
      }
    });
    Object.defineProperty(exports, "RegexLiteral", {
      enumerable: true,
      get: function() {
        return _index.regexLiteral;
      }
    });
    Object.defineProperty(exports, "RestElement", {
      enumerable: true,
      get: function() {
        return _index.restElement;
      }
    });
    Object.defineProperty(exports, "RestProperty", {
      enumerable: true,
      get: function() {
        return _index.restProperty;
      }
    });
    Object.defineProperty(exports, "ReturnStatement", {
      enumerable: true,
      get: function() {
        return _index.returnStatement;
      }
    });
    Object.defineProperty(exports, "SequenceExpression", {
      enumerable: true,
      get: function() {
        return _index.sequenceExpression;
      }
    });
    Object.defineProperty(exports, "SpreadElement", {
      enumerable: true,
      get: function() {
        return _index.spreadElement;
      }
    });
    Object.defineProperty(exports, "SpreadProperty", {
      enumerable: true,
      get: function() {
        return _index.spreadProperty;
      }
    });
    Object.defineProperty(exports, "StaticBlock", {
      enumerable: true,
      get: function() {
        return _index.staticBlock;
      }
    });
    Object.defineProperty(exports, "StringLiteral", {
      enumerable: true,
      get: function() {
        return _index.stringLiteral;
      }
    });
    Object.defineProperty(exports, "StringLiteralTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.stringLiteralTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "StringTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.stringTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "Super", {
      enumerable: true,
      get: function() {
        return _index.super;
      }
    });
    Object.defineProperty(exports, "SwitchCase", {
      enumerable: true,
      get: function() {
        return _index.switchCase;
      }
    });
    Object.defineProperty(exports, "SwitchStatement", {
      enumerable: true,
      get: function() {
        return _index.switchStatement;
      }
    });
    Object.defineProperty(exports, "SymbolTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.symbolTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "TSAnyKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsAnyKeyword;
      }
    });
    Object.defineProperty(exports, "TSArrayType", {
      enumerable: true,
      get: function() {
        return _index.tsArrayType;
      }
    });
    Object.defineProperty(exports, "TSAsExpression", {
      enumerable: true,
      get: function() {
        return _index.tsAsExpression;
      }
    });
    Object.defineProperty(exports, "TSBigIntKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsBigIntKeyword;
      }
    });
    Object.defineProperty(exports, "TSBooleanKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsBooleanKeyword;
      }
    });
    Object.defineProperty(exports, "TSCallSignatureDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsCallSignatureDeclaration;
      }
    });
    Object.defineProperty(exports, "TSConditionalType", {
      enumerable: true,
      get: function() {
        return _index.tsConditionalType;
      }
    });
    Object.defineProperty(exports, "TSConstructSignatureDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsConstructSignatureDeclaration;
      }
    });
    Object.defineProperty(exports, "TSConstructorType", {
      enumerable: true,
      get: function() {
        return _index.tsConstructorType;
      }
    });
    Object.defineProperty(exports, "TSDeclareFunction", {
      enumerable: true,
      get: function() {
        return _index.tsDeclareFunction;
      }
    });
    Object.defineProperty(exports, "TSDeclareMethod", {
      enumerable: true,
      get: function() {
        return _index.tsDeclareMethod;
      }
    });
    Object.defineProperty(exports, "TSEnumDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsEnumDeclaration;
      }
    });
    Object.defineProperty(exports, "TSEnumMember", {
      enumerable: true,
      get: function() {
        return _index.tsEnumMember;
      }
    });
    Object.defineProperty(exports, "TSExportAssignment", {
      enumerable: true,
      get: function() {
        return _index.tsExportAssignment;
      }
    });
    Object.defineProperty(exports, "TSExpressionWithTypeArguments", {
      enumerable: true,
      get: function() {
        return _index.tsExpressionWithTypeArguments;
      }
    });
    Object.defineProperty(exports, "TSExternalModuleReference", {
      enumerable: true,
      get: function() {
        return _index.tsExternalModuleReference;
      }
    });
    Object.defineProperty(exports, "TSFunctionType", {
      enumerable: true,
      get: function() {
        return _index.tsFunctionType;
      }
    });
    Object.defineProperty(exports, "TSImportEqualsDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsImportEqualsDeclaration;
      }
    });
    Object.defineProperty(exports, "TSImportType", {
      enumerable: true,
      get: function() {
        return _index.tsImportType;
      }
    });
    Object.defineProperty(exports, "TSIndexSignature", {
      enumerable: true,
      get: function() {
        return _index.tsIndexSignature;
      }
    });
    Object.defineProperty(exports, "TSIndexedAccessType", {
      enumerable: true,
      get: function() {
        return _index.tsIndexedAccessType;
      }
    });
    Object.defineProperty(exports, "TSInferType", {
      enumerable: true,
      get: function() {
        return _index.tsInferType;
      }
    });
    Object.defineProperty(exports, "TSInstantiationExpression", {
      enumerable: true,
      get: function() {
        return _index.tsInstantiationExpression;
      }
    });
    Object.defineProperty(exports, "TSInterfaceBody", {
      enumerable: true,
      get: function() {
        return _index.tsInterfaceBody;
      }
    });
    Object.defineProperty(exports, "TSInterfaceDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsInterfaceDeclaration;
      }
    });
    Object.defineProperty(exports, "TSIntersectionType", {
      enumerable: true,
      get: function() {
        return _index.tsIntersectionType;
      }
    });
    Object.defineProperty(exports, "TSIntrinsicKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsIntrinsicKeyword;
      }
    });
    Object.defineProperty(exports, "TSLiteralType", {
      enumerable: true,
      get: function() {
        return _index.tsLiteralType;
      }
    });
    Object.defineProperty(exports, "TSMappedType", {
      enumerable: true,
      get: function() {
        return _index.tsMappedType;
      }
    });
    Object.defineProperty(exports, "TSMethodSignature", {
      enumerable: true,
      get: function() {
        return _index.tsMethodSignature;
      }
    });
    Object.defineProperty(exports, "TSModuleBlock", {
      enumerable: true,
      get: function() {
        return _index.tsModuleBlock;
      }
    });
    Object.defineProperty(exports, "TSModuleDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsModuleDeclaration;
      }
    });
    Object.defineProperty(exports, "TSNamedTupleMember", {
      enumerable: true,
      get: function() {
        return _index.tsNamedTupleMember;
      }
    });
    Object.defineProperty(exports, "TSNamespaceExportDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsNamespaceExportDeclaration;
      }
    });
    Object.defineProperty(exports, "TSNeverKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsNeverKeyword;
      }
    });
    Object.defineProperty(exports, "TSNonNullExpression", {
      enumerable: true,
      get: function() {
        return _index.tsNonNullExpression;
      }
    });
    Object.defineProperty(exports, "TSNullKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsNullKeyword;
      }
    });
    Object.defineProperty(exports, "TSNumberKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsNumberKeyword;
      }
    });
    Object.defineProperty(exports, "TSObjectKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsObjectKeyword;
      }
    });
    Object.defineProperty(exports, "TSOptionalType", {
      enumerable: true,
      get: function() {
        return _index.tsOptionalType;
      }
    });
    Object.defineProperty(exports, "TSParameterProperty", {
      enumerable: true,
      get: function() {
        return _index.tsParameterProperty;
      }
    });
    Object.defineProperty(exports, "TSParenthesizedType", {
      enumerable: true,
      get: function() {
        return _index.tsParenthesizedType;
      }
    });
    Object.defineProperty(exports, "TSPropertySignature", {
      enumerable: true,
      get: function() {
        return _index.tsPropertySignature;
      }
    });
    Object.defineProperty(exports, "TSQualifiedName", {
      enumerable: true,
      get: function() {
        return _index.tsQualifiedName;
      }
    });
    Object.defineProperty(exports, "TSRestType", {
      enumerable: true,
      get: function() {
        return _index.tsRestType;
      }
    });
    Object.defineProperty(exports, "TSSatisfiesExpression", {
      enumerable: true,
      get: function() {
        return _index.tsSatisfiesExpression;
      }
    });
    Object.defineProperty(exports, "TSStringKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsStringKeyword;
      }
    });
    Object.defineProperty(exports, "TSSymbolKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsSymbolKeyword;
      }
    });
    Object.defineProperty(exports, "TSThisType", {
      enumerable: true,
      get: function() {
        return _index.tsThisType;
      }
    });
    Object.defineProperty(exports, "TSTupleType", {
      enumerable: true,
      get: function() {
        return _index.tsTupleType;
      }
    });
    Object.defineProperty(exports, "TSTypeAliasDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsTypeAliasDeclaration;
      }
    });
    Object.defineProperty(exports, "TSTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.tsTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "TSTypeAssertion", {
      enumerable: true,
      get: function() {
        return _index.tsTypeAssertion;
      }
    });
    Object.defineProperty(exports, "TSTypeLiteral", {
      enumerable: true,
      get: function() {
        return _index.tsTypeLiteral;
      }
    });
    Object.defineProperty(exports, "TSTypeOperator", {
      enumerable: true,
      get: function() {
        return _index.tsTypeOperator;
      }
    });
    Object.defineProperty(exports, "TSTypeParameter", {
      enumerable: true,
      get: function() {
        return _index.tsTypeParameter;
      }
    });
    Object.defineProperty(exports, "TSTypeParameterDeclaration", {
      enumerable: true,
      get: function() {
        return _index.tsTypeParameterDeclaration;
      }
    });
    Object.defineProperty(exports, "TSTypeParameterInstantiation", {
      enumerable: true,
      get: function() {
        return _index.tsTypeParameterInstantiation;
      }
    });
    Object.defineProperty(exports, "TSTypePredicate", {
      enumerable: true,
      get: function() {
        return _index.tsTypePredicate;
      }
    });
    Object.defineProperty(exports, "TSTypeQuery", {
      enumerable: true,
      get: function() {
        return _index.tsTypeQuery;
      }
    });
    Object.defineProperty(exports, "TSTypeReference", {
      enumerable: true,
      get: function() {
        return _index.tsTypeReference;
      }
    });
    Object.defineProperty(exports, "TSUndefinedKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsUndefinedKeyword;
      }
    });
    Object.defineProperty(exports, "TSUnionType", {
      enumerable: true,
      get: function() {
        return _index.tsUnionType;
      }
    });
    Object.defineProperty(exports, "TSUnknownKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsUnknownKeyword;
      }
    });
    Object.defineProperty(exports, "TSVoidKeyword", {
      enumerable: true,
      get: function() {
        return _index.tsVoidKeyword;
      }
    });
    Object.defineProperty(exports, "TaggedTemplateExpression", {
      enumerable: true,
      get: function() {
        return _index.taggedTemplateExpression;
      }
    });
    Object.defineProperty(exports, "TemplateElement", {
      enumerable: true,
      get: function() {
        return _index.templateElement;
      }
    });
    Object.defineProperty(exports, "TemplateLiteral", {
      enumerable: true,
      get: function() {
        return _index.templateLiteral;
      }
    });
    Object.defineProperty(exports, "ThisExpression", {
      enumerable: true,
      get: function() {
        return _index.thisExpression;
      }
    });
    Object.defineProperty(exports, "ThisTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.thisTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "ThrowStatement", {
      enumerable: true,
      get: function() {
        return _index.throwStatement;
      }
    });
    Object.defineProperty(exports, "TopicReference", {
      enumerable: true,
      get: function() {
        return _index.topicReference;
      }
    });
    Object.defineProperty(exports, "TryStatement", {
      enumerable: true,
      get: function() {
        return _index.tryStatement;
      }
    });
    Object.defineProperty(exports, "TupleExpression", {
      enumerable: true,
      get: function() {
        return _index.tupleExpression;
      }
    });
    Object.defineProperty(exports, "TupleTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.tupleTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "TypeAlias", {
      enumerable: true,
      get: function() {
        return _index.typeAlias;
      }
    });
    Object.defineProperty(exports, "TypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.typeAnnotation;
      }
    });
    Object.defineProperty(exports, "TypeCastExpression", {
      enumerable: true,
      get: function() {
        return _index.typeCastExpression;
      }
    });
    Object.defineProperty(exports, "TypeParameter", {
      enumerable: true,
      get: function() {
        return _index.typeParameter;
      }
    });
    Object.defineProperty(exports, "TypeParameterDeclaration", {
      enumerable: true,
      get: function() {
        return _index.typeParameterDeclaration;
      }
    });
    Object.defineProperty(exports, "TypeParameterInstantiation", {
      enumerable: true,
      get: function() {
        return _index.typeParameterInstantiation;
      }
    });
    Object.defineProperty(exports, "TypeofTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.typeofTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "UnaryExpression", {
      enumerable: true,
      get: function() {
        return _index.unaryExpression;
      }
    });
    Object.defineProperty(exports, "UnionTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.unionTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "UpdateExpression", {
      enumerable: true,
      get: function() {
        return _index.updateExpression;
      }
    });
    Object.defineProperty(exports, "V8IntrinsicIdentifier", {
      enumerable: true,
      get: function() {
        return _index.v8IntrinsicIdentifier;
      }
    });
    Object.defineProperty(exports, "VariableDeclaration", {
      enumerable: true,
      get: function() {
        return _index.variableDeclaration;
      }
    });
    Object.defineProperty(exports, "VariableDeclarator", {
      enumerable: true,
      get: function() {
        return _index.variableDeclarator;
      }
    });
    Object.defineProperty(exports, "Variance", {
      enumerable: true,
      get: function() {
        return _index.variance;
      }
    });
    Object.defineProperty(exports, "VoidTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _index.voidTypeAnnotation;
      }
    });
    Object.defineProperty(exports, "WhileStatement", {
      enumerable: true,
      get: function() {
        return _index.whileStatement;
      }
    });
    Object.defineProperty(exports, "WithStatement", {
      enumerable: true,
      get: function() {
        return _index.withStatement;
      }
    });
    Object.defineProperty(exports, "YieldExpression", {
      enumerable: true,
      get: function() {
        return _index.yieldExpression;
      }
    });
    var _index = require_generated2();
  }
});

// node_modules/@babel/types/lib/builders/productions.js
var require_productions = __commonJS({
  "node_modules/@babel/types/lib/builders/productions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.buildUndefinedNode = buildUndefinedNode;
    var _index = require_generated2();
    function buildUndefinedNode() {
      return (0, _index.unaryExpression)("void", (0, _index.numericLiteral)(0), true);
    }
  }
});

// node_modules/@babel/types/lib/clone/cloneNode.js
var require_cloneNode = __commonJS({
  "node_modules/@babel/types/lib/clone/cloneNode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = cloneNode;
    var _index = require_definitions();
    var _index2 = require_generated();
    var {
      hasOwn
    } = {
      hasOwn: Function.call.bind(Object.prototype.hasOwnProperty)
    };
    function cloneIfNode(obj, deep, withoutLoc, commentsCache) {
      if (obj && typeof obj.type === "string") {
        return cloneNodeInternal(obj, deep, withoutLoc, commentsCache);
      }
      return obj;
    }
    function cloneIfNodeOrArray(obj, deep, withoutLoc, commentsCache) {
      if (Array.isArray(obj)) {
        return obj.map((node) => cloneIfNode(node, deep, withoutLoc, commentsCache));
      }
      return cloneIfNode(obj, deep, withoutLoc, commentsCache);
    }
    function cloneNode(node, deep = true, withoutLoc = false) {
      return cloneNodeInternal(node, deep, withoutLoc, /* @__PURE__ */ new Map());
    }
    function cloneNodeInternal(node, deep = true, withoutLoc = false, commentsCache) {
      if (!node) return node;
      const {
        type
      } = node;
      const newNode = {
        type: node.type
      };
      if ((0, _index2.isIdentifier)(node)) {
        newNode.name = node.name;
        if (hasOwn(node, "optional") && typeof node.optional === "boolean") {
          newNode.optional = node.optional;
        }
        if (hasOwn(node, "typeAnnotation")) {
          newNode.typeAnnotation = deep ? cloneIfNodeOrArray(node.typeAnnotation, true, withoutLoc, commentsCache) : node.typeAnnotation;
        }
        if (hasOwn(node, "decorators")) {
          newNode.decorators = deep ? cloneIfNodeOrArray(node.decorators, true, withoutLoc, commentsCache) : node.decorators;
        }
      } else if (!hasOwn(_index.NODE_FIELDS, type)) {
        throw new Error(`Unknown node type: "${type}"`);
      } else {
        for (const field of Object.keys(_index.NODE_FIELDS[type])) {
          if (hasOwn(node, field)) {
            if (deep) {
              newNode[field] = (0, _index2.isFile)(node) && field === "comments" ? maybeCloneComments(node.comments, deep, withoutLoc, commentsCache) : cloneIfNodeOrArray(node[field], true, withoutLoc, commentsCache);
            } else {
              newNode[field] = node[field];
            }
          }
        }
      }
      if (hasOwn(node, "loc")) {
        if (withoutLoc) {
          newNode.loc = null;
        } else {
          newNode.loc = node.loc;
        }
      }
      if (hasOwn(node, "leadingComments")) {
        newNode.leadingComments = maybeCloneComments(node.leadingComments, deep, withoutLoc, commentsCache);
      }
      if (hasOwn(node, "innerComments")) {
        newNode.innerComments = maybeCloneComments(node.innerComments, deep, withoutLoc, commentsCache);
      }
      if (hasOwn(node, "trailingComments")) {
        newNode.trailingComments = maybeCloneComments(node.trailingComments, deep, withoutLoc, commentsCache);
      }
      if (hasOwn(node, "extra")) {
        newNode.extra = Object.assign({}, node.extra);
      }
      return newNode;
    }
    function maybeCloneComments(comments, deep, withoutLoc, commentsCache) {
      if (!comments || !deep) {
        return comments;
      }
      return comments.map((comment) => {
        const cache = commentsCache.get(comment);
        if (cache) return cache;
        const {
          type,
          value,
          loc
        } = comment;
        const ret = {
          type,
          value,
          loc
        };
        if (withoutLoc) {
          ret.loc = null;
        }
        commentsCache.set(comment, ret);
        return ret;
      });
    }
  }
});

// node_modules/@babel/types/lib/clone/clone.js
var require_clone = __commonJS({
  "node_modules/@babel/types/lib/clone/clone.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = clone;
    var _cloneNode = require_cloneNode();
    function clone(node) {
      return (0, _cloneNode.default)(node, false);
    }
  }
});

// node_modules/@babel/types/lib/clone/cloneDeep.js
var require_cloneDeep = __commonJS({
  "node_modules/@babel/types/lib/clone/cloneDeep.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = cloneDeep;
    var _cloneNode = require_cloneNode();
    function cloneDeep(node) {
      return (0, _cloneNode.default)(node);
    }
  }
});

// node_modules/@babel/types/lib/clone/cloneDeepWithoutLoc.js
var require_cloneDeepWithoutLoc = __commonJS({
  "node_modules/@babel/types/lib/clone/cloneDeepWithoutLoc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = cloneDeepWithoutLoc;
    var _cloneNode = require_cloneNode();
    function cloneDeepWithoutLoc(node) {
      return (0, _cloneNode.default)(node, true, true);
    }
  }
});

// node_modules/@babel/types/lib/clone/cloneWithoutLoc.js
var require_cloneWithoutLoc = __commonJS({
  "node_modules/@babel/types/lib/clone/cloneWithoutLoc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = cloneWithoutLoc;
    var _cloneNode = require_cloneNode();
    function cloneWithoutLoc(node) {
      return (0, _cloneNode.default)(node, false, true);
    }
  }
});

// node_modules/@babel/types/lib/comments/addComments.js
var require_addComments = __commonJS({
  "node_modules/@babel/types/lib/comments/addComments.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = addComments;
    function addComments(node, type, comments) {
      if (!comments || !node) return node;
      const key = `${type}Comments`;
      if (node[key]) {
        if (type === "leading") {
          node[key] = comments.concat(node[key]);
        } else {
          node[key].push(...comments);
        }
      } else {
        node[key] = comments;
      }
      return node;
    }
  }
});

// node_modules/@babel/types/lib/comments/addComment.js
var require_addComment = __commonJS({
  "node_modules/@babel/types/lib/comments/addComment.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = addComment;
    var _addComments = require_addComments();
    function addComment(node, type, content, line) {
      return (0, _addComments.default)(node, type, [{
        type: line ? "CommentLine" : "CommentBlock",
        value: content
      }]);
    }
  }
});

// node_modules/@babel/types/lib/utils/inherit.js
var require_inherit = __commonJS({
  "node_modules/@babel/types/lib/utils/inherit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = inherit;
    function inherit(key, child, parent) {
      if (child && parent) {
        child[key] = Array.from(new Set([].concat(child[key], parent[key]).filter(Boolean)));
      }
    }
  }
});

// node_modules/@babel/types/lib/comments/inheritInnerComments.js
var require_inheritInnerComments = __commonJS({
  "node_modules/@babel/types/lib/comments/inheritInnerComments.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = inheritInnerComments;
    var _inherit = require_inherit();
    function inheritInnerComments(child, parent) {
      (0, _inherit.default)("innerComments", child, parent);
    }
  }
});

// node_modules/@babel/types/lib/comments/inheritLeadingComments.js
var require_inheritLeadingComments = __commonJS({
  "node_modules/@babel/types/lib/comments/inheritLeadingComments.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = inheritLeadingComments;
    var _inherit = require_inherit();
    function inheritLeadingComments(child, parent) {
      (0, _inherit.default)("leadingComments", child, parent);
    }
  }
});

// node_modules/@babel/types/lib/comments/inheritTrailingComments.js
var require_inheritTrailingComments = __commonJS({
  "node_modules/@babel/types/lib/comments/inheritTrailingComments.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = inheritTrailingComments;
    var _inherit = require_inherit();
    function inheritTrailingComments(child, parent) {
      (0, _inherit.default)("trailingComments", child, parent);
    }
  }
});

// node_modules/@babel/types/lib/comments/inheritsComments.js
var require_inheritsComments = __commonJS({
  "node_modules/@babel/types/lib/comments/inheritsComments.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = inheritsComments;
    var _inheritTrailingComments = require_inheritTrailingComments();
    var _inheritLeadingComments = require_inheritLeadingComments();
    var _inheritInnerComments = require_inheritInnerComments();
    function inheritsComments(child, parent) {
      (0, _inheritTrailingComments.default)(child, parent);
      (0, _inheritLeadingComments.default)(child, parent);
      (0, _inheritInnerComments.default)(child, parent);
      return child;
    }
  }
});

// node_modules/@babel/types/lib/comments/removeComments.js
var require_removeComments = __commonJS({
  "node_modules/@babel/types/lib/comments/removeComments.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = removeComments;
    var _index = require_constants();
    function removeComments(node) {
      _index.COMMENT_KEYS.forEach((key) => {
        node[key] = null;
      });
      return node;
    }
  }
});

// node_modules/@babel/types/lib/constants/generated/index.js
var require_generated4 = __commonJS({
  "node_modules/@babel/types/lib/constants/generated/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WHILE_TYPES = exports.USERWHITESPACABLE_TYPES = exports.UNARYLIKE_TYPES = exports.TYPESCRIPT_TYPES = exports.TSTYPE_TYPES = exports.TSTYPEELEMENT_TYPES = exports.TSENTITYNAME_TYPES = exports.TSBASETYPE_TYPES = exports.TERMINATORLESS_TYPES = exports.STATEMENT_TYPES = exports.STANDARDIZED_TYPES = exports.SCOPABLE_TYPES = exports.PUREISH_TYPES = exports.PROPERTY_TYPES = exports.PRIVATE_TYPES = exports.PATTERN_TYPES = exports.PATTERNLIKE_TYPES = exports.OBJECTMEMBER_TYPES = exports.MODULESPECIFIER_TYPES = exports.MODULEDECLARATION_TYPES = exports.MISCELLANEOUS_TYPES = exports.METHOD_TYPES = exports.LVAL_TYPES = exports.LOOP_TYPES = exports.LITERAL_TYPES = exports.JSX_TYPES = exports.IMPORTOREXPORTDECLARATION_TYPES = exports.IMMUTABLE_TYPES = exports.FUNCTION_TYPES = exports.FUNCTIONPARENT_TYPES = exports.FOR_TYPES = exports.FORXSTATEMENT_TYPES = exports.FLOW_TYPES = exports.FLOWTYPE_TYPES = exports.FLOWPREDICATE_TYPES = exports.FLOWDECLARATION_TYPES = exports.FLOWBASEANNOTATION_TYPES = exports.EXPRESSION_TYPES = exports.EXPRESSIONWRAPPER_TYPES = exports.EXPORTDECLARATION_TYPES = exports.ENUMMEMBER_TYPES = exports.ENUMBODY_TYPES = exports.DECLARATION_TYPES = exports.CONDITIONAL_TYPES = exports.COMPLETIONSTATEMENT_TYPES = exports.CLASS_TYPES = exports.BLOCK_TYPES = exports.BLOCKPARENT_TYPES = exports.BINARY_TYPES = exports.ACCESSOR_TYPES = void 0;
    var _index = require_definitions();
    var STANDARDIZED_TYPES = exports.STANDARDIZED_TYPES = _index.FLIPPED_ALIAS_KEYS["Standardized"];
    var EXPRESSION_TYPES = exports.EXPRESSION_TYPES = _index.FLIPPED_ALIAS_KEYS["Expression"];
    var BINARY_TYPES = exports.BINARY_TYPES = _index.FLIPPED_ALIAS_KEYS["Binary"];
    var SCOPABLE_TYPES = exports.SCOPABLE_TYPES = _index.FLIPPED_ALIAS_KEYS["Scopable"];
    var BLOCKPARENT_TYPES = exports.BLOCKPARENT_TYPES = _index.FLIPPED_ALIAS_KEYS["BlockParent"];
    var BLOCK_TYPES = exports.BLOCK_TYPES = _index.FLIPPED_ALIAS_KEYS["Block"];
    var STATEMENT_TYPES = exports.STATEMENT_TYPES = _index.FLIPPED_ALIAS_KEYS["Statement"];
    var TERMINATORLESS_TYPES = exports.TERMINATORLESS_TYPES = _index.FLIPPED_ALIAS_KEYS["Terminatorless"];
    var COMPLETIONSTATEMENT_TYPES = exports.COMPLETIONSTATEMENT_TYPES = _index.FLIPPED_ALIAS_KEYS["CompletionStatement"];
    var CONDITIONAL_TYPES = exports.CONDITIONAL_TYPES = _index.FLIPPED_ALIAS_KEYS["Conditional"];
    var LOOP_TYPES = exports.LOOP_TYPES = _index.FLIPPED_ALIAS_KEYS["Loop"];
    var WHILE_TYPES = exports.WHILE_TYPES = _index.FLIPPED_ALIAS_KEYS["While"];
    var EXPRESSIONWRAPPER_TYPES = exports.EXPRESSIONWRAPPER_TYPES = _index.FLIPPED_ALIAS_KEYS["ExpressionWrapper"];
    var FOR_TYPES = exports.FOR_TYPES = _index.FLIPPED_ALIAS_KEYS["For"];
    var FORXSTATEMENT_TYPES = exports.FORXSTATEMENT_TYPES = _index.FLIPPED_ALIAS_KEYS["ForXStatement"];
    var FUNCTION_TYPES = exports.FUNCTION_TYPES = _index.FLIPPED_ALIAS_KEYS["Function"];
    var FUNCTIONPARENT_TYPES = exports.FUNCTIONPARENT_TYPES = _index.FLIPPED_ALIAS_KEYS["FunctionParent"];
    var PUREISH_TYPES = exports.PUREISH_TYPES = _index.FLIPPED_ALIAS_KEYS["Pureish"];
    var DECLARATION_TYPES = exports.DECLARATION_TYPES = _index.FLIPPED_ALIAS_KEYS["Declaration"];
    var PATTERNLIKE_TYPES = exports.PATTERNLIKE_TYPES = _index.FLIPPED_ALIAS_KEYS["PatternLike"];
    var LVAL_TYPES = exports.LVAL_TYPES = _index.FLIPPED_ALIAS_KEYS["LVal"];
    var TSENTITYNAME_TYPES = exports.TSENTITYNAME_TYPES = _index.FLIPPED_ALIAS_KEYS["TSEntityName"];
    var LITERAL_TYPES = exports.LITERAL_TYPES = _index.FLIPPED_ALIAS_KEYS["Literal"];
    var IMMUTABLE_TYPES = exports.IMMUTABLE_TYPES = _index.FLIPPED_ALIAS_KEYS["Immutable"];
    var USERWHITESPACABLE_TYPES = exports.USERWHITESPACABLE_TYPES = _index.FLIPPED_ALIAS_KEYS["UserWhitespacable"];
    var METHOD_TYPES = exports.METHOD_TYPES = _index.FLIPPED_ALIAS_KEYS["Method"];
    var OBJECTMEMBER_TYPES = exports.OBJECTMEMBER_TYPES = _index.FLIPPED_ALIAS_KEYS["ObjectMember"];
    var PROPERTY_TYPES = exports.PROPERTY_TYPES = _index.FLIPPED_ALIAS_KEYS["Property"];
    var UNARYLIKE_TYPES = exports.UNARYLIKE_TYPES = _index.FLIPPED_ALIAS_KEYS["UnaryLike"];
    var PATTERN_TYPES = exports.PATTERN_TYPES = _index.FLIPPED_ALIAS_KEYS["Pattern"];
    var CLASS_TYPES = exports.CLASS_TYPES = _index.FLIPPED_ALIAS_KEYS["Class"];
    var IMPORTOREXPORTDECLARATION_TYPES = exports.IMPORTOREXPORTDECLARATION_TYPES = _index.FLIPPED_ALIAS_KEYS["ImportOrExportDeclaration"];
    var EXPORTDECLARATION_TYPES = exports.EXPORTDECLARATION_TYPES = _index.FLIPPED_ALIAS_KEYS["ExportDeclaration"];
    var MODULESPECIFIER_TYPES = exports.MODULESPECIFIER_TYPES = _index.FLIPPED_ALIAS_KEYS["ModuleSpecifier"];
    var ACCESSOR_TYPES = exports.ACCESSOR_TYPES = _index.FLIPPED_ALIAS_KEYS["Accessor"];
    var PRIVATE_TYPES = exports.PRIVATE_TYPES = _index.FLIPPED_ALIAS_KEYS["Private"];
    var FLOW_TYPES = exports.FLOW_TYPES = _index.FLIPPED_ALIAS_KEYS["Flow"];
    var FLOWTYPE_TYPES = exports.FLOWTYPE_TYPES = _index.FLIPPED_ALIAS_KEYS["FlowType"];
    var FLOWBASEANNOTATION_TYPES = exports.FLOWBASEANNOTATION_TYPES = _index.FLIPPED_ALIAS_KEYS["FlowBaseAnnotation"];
    var FLOWDECLARATION_TYPES = exports.FLOWDECLARATION_TYPES = _index.FLIPPED_ALIAS_KEYS["FlowDeclaration"];
    var FLOWPREDICATE_TYPES = exports.FLOWPREDICATE_TYPES = _index.FLIPPED_ALIAS_KEYS["FlowPredicate"];
    var ENUMBODY_TYPES = exports.ENUMBODY_TYPES = _index.FLIPPED_ALIAS_KEYS["EnumBody"];
    var ENUMMEMBER_TYPES = exports.ENUMMEMBER_TYPES = _index.FLIPPED_ALIAS_KEYS["EnumMember"];
    var JSX_TYPES = exports.JSX_TYPES = _index.FLIPPED_ALIAS_KEYS["JSX"];
    var MISCELLANEOUS_TYPES = exports.MISCELLANEOUS_TYPES = _index.FLIPPED_ALIAS_KEYS["Miscellaneous"];
    var TYPESCRIPT_TYPES = exports.TYPESCRIPT_TYPES = _index.FLIPPED_ALIAS_KEYS["TypeScript"];
    var TSTYPEELEMENT_TYPES = exports.TSTYPEELEMENT_TYPES = _index.FLIPPED_ALIAS_KEYS["TSTypeElement"];
    var TSTYPE_TYPES = exports.TSTYPE_TYPES = _index.FLIPPED_ALIAS_KEYS["TSType"];
    var TSBASETYPE_TYPES = exports.TSBASETYPE_TYPES = _index.FLIPPED_ALIAS_KEYS["TSBaseType"];
    var MODULEDECLARATION_TYPES = exports.MODULEDECLARATION_TYPES = IMPORTOREXPORTDECLARATION_TYPES;
  }
});

// node_modules/@babel/types/lib/converters/toBlock.js
var require_toBlock = __commonJS({
  "node_modules/@babel/types/lib/converters/toBlock.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = toBlock;
    var _index = require_generated();
    var _index2 = require_generated2();
    function toBlock(node, parent) {
      if ((0, _index.isBlockStatement)(node)) {
        return node;
      }
      let blockNodes = [];
      if ((0, _index.isEmptyStatement)(node)) {
        blockNodes = [];
      } else {
        if (!(0, _index.isStatement)(node)) {
          if ((0, _index.isFunction)(parent)) {
            node = (0, _index2.returnStatement)(node);
          } else {
            node = (0, _index2.expressionStatement)(node);
          }
        }
        blockNodes = [node];
      }
      return (0, _index2.blockStatement)(blockNodes);
    }
  }
});

// node_modules/@babel/types/lib/converters/ensureBlock.js
var require_ensureBlock = __commonJS({
  "node_modules/@babel/types/lib/converters/ensureBlock.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = ensureBlock;
    var _toBlock = require_toBlock();
    function ensureBlock(node, key = "body") {
      const result = (0, _toBlock.default)(node[key], node);
      node[key] = result;
      return result;
    }
  }
});

// node_modules/@babel/types/lib/converters/toIdentifier.js
var require_toIdentifier = __commonJS({
  "node_modules/@babel/types/lib/converters/toIdentifier.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = toIdentifier;
    var _isValidIdentifier = require_isValidIdentifier();
    var _helperValidatorIdentifier = require_lib();
    function toIdentifier(input) {
      input = input + "";
      let name = "";
      for (const c of input) {
        name += (0, _helperValidatorIdentifier.isIdentifierChar)(c.codePointAt(0)) ? c : "-";
      }
      name = name.replace(/^[-0-9]+/, "");
      name = name.replace(/[-\s]+(.)?/g, function(match, c) {
        return c ? c.toUpperCase() : "";
      });
      if (!(0, _isValidIdentifier.default)(name)) {
        name = `_${name}`;
      }
      return name || "_";
    }
  }
});

// node_modules/@babel/types/lib/converters/toBindingIdentifierName.js
var require_toBindingIdentifierName = __commonJS({
  "node_modules/@babel/types/lib/converters/toBindingIdentifierName.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = toBindingIdentifierName;
    var _toIdentifier = require_toIdentifier();
    function toBindingIdentifierName(name) {
      name = (0, _toIdentifier.default)(name);
      if (name === "eval" || name === "arguments") name = "_" + name;
      return name;
    }
  }
});

// node_modules/@babel/types/lib/converters/toComputedKey.js
var require_toComputedKey = __commonJS({
  "node_modules/@babel/types/lib/converters/toComputedKey.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = toComputedKey;
    var _index = require_generated();
    var _index2 = require_generated2();
    function toComputedKey(node, key = node.key || node.property) {
      if (!node.computed && (0, _index.isIdentifier)(key)) key = (0, _index2.stringLiteral)(key.name);
      return key;
    }
  }
});

// node_modules/@babel/types/lib/converters/toExpression.js
var require_toExpression = __commonJS({
  "node_modules/@babel/types/lib/converters/toExpression.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _index = require_generated();
    var _default = exports.default = toExpression;
    function toExpression(node) {
      if ((0, _index.isExpressionStatement)(node)) {
        node = node.expression;
      }
      if ((0, _index.isExpression)(node)) {
        return node;
      }
      if ((0, _index.isClass)(node)) {
        node.type = "ClassExpression";
      } else if ((0, _index.isFunction)(node)) {
        node.type = "FunctionExpression";
      }
      if (!(0, _index.isExpression)(node)) {
        throw new Error(`cannot turn ${node.type} to an expression`);
      }
      return node;
    }
  }
});

// node_modules/@babel/types/lib/traverse/traverseFast.js
var require_traverseFast = __commonJS({
  "node_modules/@babel/types/lib/traverse/traverseFast.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = traverseFast;
    var _index = require_definitions();
    function traverseFast(node, enter, opts) {
      if (!node) return;
      const keys = _index.VISITOR_KEYS[node.type];
      if (!keys) return;
      opts = opts || {};
      enter(node, opts);
      for (const key of keys) {
        const subNode = node[key];
        if (Array.isArray(subNode)) {
          for (const node2 of subNode) {
            traverseFast(node2, enter, opts);
          }
        } else {
          traverseFast(subNode, enter, opts);
        }
      }
    }
  }
});

// node_modules/@babel/types/lib/modifications/removeProperties.js
var require_removeProperties = __commonJS({
  "node_modules/@babel/types/lib/modifications/removeProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = removeProperties;
    var _index = require_constants();
    var CLEAR_KEYS = ["tokens", "start", "end", "loc", "raw", "rawValue"];
    var CLEAR_KEYS_PLUS_COMMENTS = [..._index.COMMENT_KEYS, "comments", ...CLEAR_KEYS];
    function removeProperties(node, opts = {}) {
      const map = opts.preserveComments ? CLEAR_KEYS : CLEAR_KEYS_PLUS_COMMENTS;
      for (const key of map) {
        if (node[key] != null) node[key] = void 0;
      }
      for (const key of Object.keys(node)) {
        if (key[0] === "_" && node[key] != null) node[key] = void 0;
      }
      const symbols = Object.getOwnPropertySymbols(node);
      for (const sym of symbols) {
        node[sym] = null;
      }
    }
  }
});

// node_modules/@babel/types/lib/modifications/removePropertiesDeep.js
var require_removePropertiesDeep = __commonJS({
  "node_modules/@babel/types/lib/modifications/removePropertiesDeep.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = removePropertiesDeep;
    var _traverseFast = require_traverseFast();
    var _removeProperties = require_removeProperties();
    function removePropertiesDeep(tree, opts) {
      (0, _traverseFast.default)(tree, _removeProperties.default, opts);
      return tree;
    }
  }
});

// node_modules/@babel/types/lib/converters/toKeyAlias.js
var require_toKeyAlias = __commonJS({
  "node_modules/@babel/types/lib/converters/toKeyAlias.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = toKeyAlias;
    var _index = require_generated();
    var _cloneNode = require_cloneNode();
    var _removePropertiesDeep = require_removePropertiesDeep();
    function toKeyAlias(node, key = node.key) {
      let alias;
      if (node.kind === "method") {
        return toKeyAlias.increment() + "";
      } else if ((0, _index.isIdentifier)(key)) {
        alias = key.name;
      } else if ((0, _index.isStringLiteral)(key)) {
        alias = JSON.stringify(key.value);
      } else {
        alias = JSON.stringify((0, _removePropertiesDeep.default)((0, _cloneNode.default)(key)));
      }
      if (node.computed) {
        alias = `[${alias}]`;
      }
      if (node.static) {
        alias = `static:${alias}`;
      }
      return alias;
    }
    toKeyAlias.uid = 0;
    toKeyAlias.increment = function() {
      if (toKeyAlias.uid >= Number.MAX_SAFE_INTEGER) {
        return toKeyAlias.uid = 0;
      } else {
        return toKeyAlias.uid++;
      }
    };
  }
});

// node_modules/@babel/types/lib/converters/toStatement.js
var require_toStatement = __commonJS({
  "node_modules/@babel/types/lib/converters/toStatement.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _index = require_generated();
    var _index2 = require_generated2();
    var _default = exports.default = toStatement;
    function toStatement(node, ignore2) {
      if ((0, _index.isStatement)(node)) {
        return node;
      }
      let mustHaveId = false;
      let newType;
      if ((0, _index.isClass)(node)) {
        mustHaveId = true;
        newType = "ClassDeclaration";
      } else if ((0, _index.isFunction)(node)) {
        mustHaveId = true;
        newType = "FunctionDeclaration";
      } else if ((0, _index.isAssignmentExpression)(node)) {
        return (0, _index2.expressionStatement)(node);
      }
      if (mustHaveId && !node.id) {
        newType = false;
      }
      if (!newType) {
        if (ignore2) {
          return false;
        } else {
          throw new Error(`cannot turn ${node.type} to a statement`);
        }
      }
      node.type = newType;
      return node;
    }
  }
});

// node_modules/@babel/types/lib/converters/valueToNode.js
var require_valueToNode = __commonJS({
  "node_modules/@babel/types/lib/converters/valueToNode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _isValidIdentifier = require_isValidIdentifier();
    var _index = require_generated2();
    var _default = exports.default = valueToNode;
    var objectToString = Function.call.bind(Object.prototype.toString);
    function isRegExp(value) {
      return objectToString(value) === "[object RegExp]";
    }
    function isPlainObject(value) {
      if (typeof value !== "object" || value === null || Object.prototype.toString.call(value) !== "[object Object]") {
        return false;
      }
      const proto = Object.getPrototypeOf(value);
      return proto === null || Object.getPrototypeOf(proto) === null;
    }
    function valueToNode(value) {
      if (value === void 0) {
        return (0, _index.identifier)("undefined");
      }
      if (value === true || value === false) {
        return (0, _index.booleanLiteral)(value);
      }
      if (value === null) {
        return (0, _index.nullLiteral)();
      }
      if (typeof value === "string") {
        return (0, _index.stringLiteral)(value);
      }
      if (typeof value === "number") {
        let result;
        if (Number.isFinite(value)) {
          result = (0, _index.numericLiteral)(Math.abs(value));
        } else {
          let numerator;
          if (Number.isNaN(value)) {
            numerator = (0, _index.numericLiteral)(0);
          } else {
            numerator = (0, _index.numericLiteral)(1);
          }
          result = (0, _index.binaryExpression)("/", numerator, (0, _index.numericLiteral)(0));
        }
        if (value < 0 || Object.is(value, -0)) {
          result = (0, _index.unaryExpression)("-", result);
        }
        return result;
      }
      if (isRegExp(value)) {
        const pattern = value.source;
        const flags = /\/([a-z]*)$/.exec(value.toString())[1];
        return (0, _index.regExpLiteral)(pattern, flags);
      }
      if (Array.isArray(value)) {
        return (0, _index.arrayExpression)(value.map(valueToNode));
      }
      if (isPlainObject(value)) {
        const props = [];
        for (const key of Object.keys(value)) {
          let nodeKey;
          if ((0, _isValidIdentifier.default)(key)) {
            nodeKey = (0, _index.identifier)(key);
          } else {
            nodeKey = (0, _index.stringLiteral)(key);
          }
          props.push((0, _index.objectProperty)(nodeKey, valueToNode(value[key])));
        }
        return (0, _index.objectExpression)(props);
      }
      throw new Error("don't know how to turn this value into a node");
    }
  }
});

// node_modules/@babel/types/lib/modifications/appendToMemberExpression.js
var require_appendToMemberExpression = __commonJS({
  "node_modules/@babel/types/lib/modifications/appendToMemberExpression.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = appendToMemberExpression;
    var _index = require_generated2();
    function appendToMemberExpression(member, append, computed = false) {
      member.object = (0, _index.memberExpression)(member.object, member.property, member.computed);
      member.property = append;
      member.computed = !!computed;
      return member;
    }
  }
});

// node_modules/@babel/types/lib/modifications/inherits.js
var require_inherits = __commonJS({
  "node_modules/@babel/types/lib/modifications/inherits.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = inherits;
    var _index = require_constants();
    var _inheritsComments = require_inheritsComments();
    function inherits(child, parent) {
      if (!child || !parent) return child;
      for (const key of _index.INHERIT_KEYS.optional) {
        if (child[key] == null) {
          child[key] = parent[key];
        }
      }
      for (const key of Object.keys(parent)) {
        if (key[0] === "_" && key !== "__clone") {
          child[key] = parent[key];
        }
      }
      for (const key of _index.INHERIT_KEYS.force) {
        child[key] = parent[key];
      }
      (0, _inheritsComments.default)(child, parent);
      return child;
    }
  }
});

// node_modules/@babel/types/lib/modifications/prependToMemberExpression.js
var require_prependToMemberExpression = __commonJS({
  "node_modules/@babel/types/lib/modifications/prependToMemberExpression.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = prependToMemberExpression;
    var _index = require_generated2();
    var _index2 = require_lib3();
    function prependToMemberExpression(member, prepend) {
      if ((0, _index2.isSuper)(member.object)) {
        throw new Error("Cannot prepend node to super property access (`super.foo`).");
      }
      member.object = (0, _index.memberExpression)(prepend, member.object);
      return member;
    }
  }
});

// node_modules/@babel/types/lib/retrievers/getAssignmentIdentifiers.js
var require_getAssignmentIdentifiers = __commonJS({
  "node_modules/@babel/types/lib/retrievers/getAssignmentIdentifiers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getAssignmentIdentifiers;
    function getAssignmentIdentifiers(node) {
      const search = [].concat(node);
      const ids = /* @__PURE__ */ Object.create(null);
      while (search.length) {
        const id = search.pop();
        if (!id) continue;
        switch (id.type) {
          case "ArrayPattern":
            search.push(...id.elements);
            break;
          case "AssignmentExpression":
          case "AssignmentPattern":
          case "ForInStatement":
          case "ForOfStatement":
            search.push(id.left);
            break;
          case "ObjectPattern":
            search.push(...id.properties);
            break;
          case "ObjectProperty":
            search.push(id.value);
            break;
          case "RestElement":
          case "UpdateExpression":
            search.push(id.argument);
            break;
          case "UnaryExpression":
            if (id.operator === "delete") {
              search.push(id.argument);
            }
            break;
          case "Identifier":
            ids[id.name] = id;
            break;
          default:
            break;
        }
      }
      return ids;
    }
  }
});

// node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js
var require_getBindingIdentifiers = __commonJS({
  "node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getBindingIdentifiers;
    var _index = require_generated();
    function getBindingIdentifiers(node, duplicates, outerOnly, newBindingsOnly) {
      const search = [].concat(node);
      const ids = /* @__PURE__ */ Object.create(null);
      while (search.length) {
        const id = search.shift();
        if (!id) continue;
        if (newBindingsOnly && ((0, _index.isAssignmentExpression)(id) || (0, _index.isUnaryExpression)(id) || (0, _index.isUpdateExpression)(id))) {
          continue;
        }
        if ((0, _index.isIdentifier)(id)) {
          if (duplicates) {
            const _ids = ids[id.name] = ids[id.name] || [];
            _ids.push(id);
          } else {
            ids[id.name] = id;
          }
          continue;
        }
        if ((0, _index.isExportDeclaration)(id) && !(0, _index.isExportAllDeclaration)(id)) {
          if ((0, _index.isDeclaration)(id.declaration)) {
            search.push(id.declaration);
          }
          continue;
        }
        if (outerOnly) {
          if ((0, _index.isFunctionDeclaration)(id)) {
            search.push(id.id);
            continue;
          }
          if ((0, _index.isFunctionExpression)(id)) {
            continue;
          }
        }
        const keys2 = getBindingIdentifiers.keys[id.type];
        if (keys2) {
          for (let i = 0; i < keys2.length; i++) {
            const key = keys2[i];
            const nodes = id[key];
            if (nodes) {
              if (Array.isArray(nodes)) {
                search.push(...nodes);
              } else {
                search.push(nodes);
              }
            }
          }
        }
      }
      return ids;
    }
    var keys = {
      DeclareClass: ["id"],
      DeclareFunction: ["id"],
      DeclareModule: ["id"],
      DeclareVariable: ["id"],
      DeclareInterface: ["id"],
      DeclareTypeAlias: ["id"],
      DeclareOpaqueType: ["id"],
      InterfaceDeclaration: ["id"],
      TypeAlias: ["id"],
      OpaqueType: ["id"],
      CatchClause: ["param"],
      LabeledStatement: ["label"],
      UnaryExpression: ["argument"],
      AssignmentExpression: ["left"],
      ImportSpecifier: ["local"],
      ImportNamespaceSpecifier: ["local"],
      ImportDefaultSpecifier: ["local"],
      ImportDeclaration: ["specifiers"],
      ExportSpecifier: ["exported"],
      ExportNamespaceSpecifier: ["exported"],
      ExportDefaultSpecifier: ["exported"],
      FunctionDeclaration: ["id", "params"],
      FunctionExpression: ["id", "params"],
      ArrowFunctionExpression: ["params"],
      ObjectMethod: ["params"],
      ClassMethod: ["params"],
      ClassPrivateMethod: ["params"],
      ForInStatement: ["left"],
      ForOfStatement: ["left"],
      ClassDeclaration: ["id"],
      ClassExpression: ["id"],
      RestElement: ["argument"],
      UpdateExpression: ["argument"],
      ObjectProperty: ["value"],
      AssignmentPattern: ["left"],
      ArrayPattern: ["elements"],
      ObjectPattern: ["properties"],
      VariableDeclaration: ["declarations"],
      VariableDeclarator: ["id"]
    };
    getBindingIdentifiers.keys = keys;
  }
});

// node_modules/@babel/types/lib/retrievers/getOuterBindingIdentifiers.js
var require_getOuterBindingIdentifiers = __commonJS({
  "node_modules/@babel/types/lib/retrievers/getOuterBindingIdentifiers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _getBindingIdentifiers = require_getBindingIdentifiers();
    var _default = exports.default = getOuterBindingIdentifiers;
    function getOuterBindingIdentifiers(node, duplicates) {
      return (0, _getBindingIdentifiers.default)(node, duplicates, true);
    }
  }
});

// node_modules/@babel/types/lib/retrievers/getFunctionName.js
var require_getFunctionName = __commonJS({
  "node_modules/@babel/types/lib/retrievers/getFunctionName.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getFunctionName;
    var _index = require_generated();
    function getNameFromLiteralId(id) {
      if ((0, _index.isNullLiteral)(id)) {
        return "null";
      }
      if ((0, _index.isRegExpLiteral)(id)) {
        return `/${id.pattern}/${id.flags}`;
      }
      if ((0, _index.isTemplateLiteral)(id)) {
        return id.quasis.map((quasi) => quasi.value.raw).join("");
      }
      if (id.value !== void 0) {
        return String(id.value);
      }
      return null;
    }
    function getObjectMemberKey(node) {
      if (!node.computed || (0, _index.isLiteral)(node.key)) {
        return node.key;
      }
    }
    function getFunctionName(node, parent) {
      if ("id" in node && node.id) {
        return {
          name: node.id.name,
          originalNode: node.id
        };
      }
      let prefix = "";
      let id;
      if ((0, _index.isObjectProperty)(parent, {
        value: node
      })) {
        id = getObjectMemberKey(parent);
      } else if ((0, _index.isObjectMethod)(node) || (0, _index.isClassMethod)(node)) {
        id = getObjectMemberKey(node);
        if (node.kind === "get") prefix = "get ";
        else if (node.kind === "set") prefix = "set ";
      } else if ((0, _index.isVariableDeclarator)(parent, {
        init: node
      })) {
        id = parent.id;
      } else if ((0, _index.isAssignmentExpression)(parent, {
        operator: "=",
        right: node
      })) {
        id = parent.left;
      }
      if (!id) return null;
      const name = (0, _index.isLiteral)(id) ? getNameFromLiteralId(id) : (0, _index.isIdentifier)(id) ? id.name : (0, _index.isPrivateName)(id) ? id.id.name : null;
      if (name == null) return null;
      return {
        name: prefix + name,
        originalNode: id
      };
    }
  }
});

// node_modules/@babel/types/lib/traverse/traverse.js
var require_traverse = __commonJS({
  "node_modules/@babel/types/lib/traverse/traverse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = traverse;
    var _index = require_definitions();
    function traverse(node, handlers, state) {
      if (typeof handlers === "function") {
        handlers = {
          enter: handlers
        };
      }
      const {
        enter,
        exit
      } = handlers;
      traverseSimpleImpl(node, enter, exit, state, []);
    }
    function traverseSimpleImpl(node, enter, exit, state, ancestors) {
      const keys = _index.VISITOR_KEYS[node.type];
      if (!keys) return;
      if (enter) enter(node, ancestors, state);
      for (const key of keys) {
        const subNode = node[key];
        if (Array.isArray(subNode)) {
          for (let i = 0; i < subNode.length; i++) {
            const child = subNode[i];
            if (!child) continue;
            ancestors.push({
              node,
              key,
              index: i
            });
            traverseSimpleImpl(child, enter, exit, state, ancestors);
            ancestors.pop();
          }
        } else if (subNode) {
          ancestors.push({
            node,
            key
          });
          traverseSimpleImpl(subNode, enter, exit, state, ancestors);
          ancestors.pop();
        }
      }
      if (exit) exit(node, ancestors, state);
    }
  }
});

// node_modules/@babel/types/lib/validators/isBinding.js
var require_isBinding = __commonJS({
  "node_modules/@babel/types/lib/validators/isBinding.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isBinding;
    var _getBindingIdentifiers = require_getBindingIdentifiers();
    function isBinding(node, parent, grandparent) {
      if (grandparent && node.type === "Identifier" && parent.type === "ObjectProperty" && grandparent.type === "ObjectExpression") {
        return false;
      }
      const keys = _getBindingIdentifiers.default.keys[parent.type];
      if (keys) {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const val = parent[key];
          if (Array.isArray(val)) {
            if (val.includes(node)) return true;
          } else {
            if (val === node) return true;
          }
        }
      }
      return false;
    }
  }
});

// node_modules/@babel/types/lib/validators/isLet.js
var require_isLet = __commonJS({
  "node_modules/@babel/types/lib/validators/isLet.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isLet;
    var _index = require_generated();
    var _index2 = require_constants();
    function isLet(node) {
      return (0, _index.isVariableDeclaration)(node) && (node.kind !== "var" || node[_index2.BLOCK_SCOPED_SYMBOL]);
    }
  }
});

// node_modules/@babel/types/lib/validators/isBlockScoped.js
var require_isBlockScoped = __commonJS({
  "node_modules/@babel/types/lib/validators/isBlockScoped.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isBlockScoped;
    var _index = require_generated();
    var _isLet = require_isLet();
    function isBlockScoped(node) {
      return (0, _index.isFunctionDeclaration)(node) || (0, _index.isClassDeclaration)(node) || (0, _isLet.default)(node);
    }
  }
});

// node_modules/@babel/types/lib/validators/isImmutable.js
var require_isImmutable = __commonJS({
  "node_modules/@babel/types/lib/validators/isImmutable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isImmutable;
    var _isType = require_isType();
    var _index = require_generated();
    function isImmutable(node) {
      if ((0, _isType.default)(node.type, "Immutable")) return true;
      if ((0, _index.isIdentifier)(node)) {
        if (node.name === "undefined") {
          return true;
        } else {
          return false;
        }
      }
      return false;
    }
  }
});

// node_modules/@babel/types/lib/validators/isNodesEquivalent.js
var require_isNodesEquivalent = __commonJS({
  "node_modules/@babel/types/lib/validators/isNodesEquivalent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isNodesEquivalent;
    var _index = require_definitions();
    function isNodesEquivalent(a, b) {
      if (typeof a !== "object" || typeof b !== "object" || a == null || b == null) {
        return a === b;
      }
      if (a.type !== b.type) {
        return false;
      }
      const fields = Object.keys(_index.NODE_FIELDS[a.type] || a.type);
      const visitorKeys = _index.VISITOR_KEYS[a.type];
      for (const field of fields) {
        const val_a = a[field];
        const val_b = b[field];
        if (typeof val_a !== typeof val_b) {
          return false;
        }
        if (val_a == null && val_b == null) {
          continue;
        } else if (val_a == null || val_b == null) {
          return false;
        }
        if (Array.isArray(val_a)) {
          if (!Array.isArray(val_b)) {
            return false;
          }
          if (val_a.length !== val_b.length) {
            return false;
          }
          for (let i = 0; i < val_a.length; i++) {
            if (!isNodesEquivalent(val_a[i], val_b[i])) {
              return false;
            }
          }
          continue;
        }
        if (typeof val_a === "object" && !(visitorKeys != null && visitorKeys.includes(field))) {
          for (const key of Object.keys(val_a)) {
            if (val_a[key] !== val_b[key]) {
              return false;
            }
          }
          continue;
        }
        if (!isNodesEquivalent(val_a, val_b)) {
          return false;
        }
      }
      return true;
    }
  }
});

// node_modules/@babel/types/lib/validators/isReferenced.js
var require_isReferenced = __commonJS({
  "node_modules/@babel/types/lib/validators/isReferenced.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isReferenced;
    function isReferenced(node, parent, grandparent) {
      switch (parent.type) {
        case "MemberExpression":
        case "OptionalMemberExpression":
          if (parent.property === node) {
            return !!parent.computed;
          }
          return parent.object === node;
        case "JSXMemberExpression":
          return parent.object === node;
        case "VariableDeclarator":
          return parent.init === node;
        case "ArrowFunctionExpression":
          return parent.body === node;
        case "PrivateName":
          return false;
        case "ClassMethod":
        case "ClassPrivateMethod":
        case "ObjectMethod":
          if (parent.key === node) {
            return !!parent.computed;
          }
          return false;
        case "ObjectProperty":
          if (parent.key === node) {
            return !!parent.computed;
          }
          return !grandparent || grandparent.type !== "ObjectPattern";
        case "ClassProperty":
        case "ClassAccessorProperty":
          if (parent.key === node) {
            return !!parent.computed;
          }
          return true;
        case "ClassPrivateProperty":
          return parent.key !== node;
        case "ClassDeclaration":
        case "ClassExpression":
          return parent.superClass === node;
        case "AssignmentExpression":
          return parent.right === node;
        case "AssignmentPattern":
          return parent.right === node;
        case "LabeledStatement":
          return false;
        case "CatchClause":
          return false;
        case "RestElement":
          return false;
        case "BreakStatement":
        case "ContinueStatement":
          return false;
        case "FunctionDeclaration":
        case "FunctionExpression":
          return false;
        case "ExportNamespaceSpecifier":
        case "ExportDefaultSpecifier":
          return false;
        case "ExportSpecifier":
          if (grandparent != null && grandparent.source) {
            return false;
          }
          return parent.local === node;
        case "ImportDefaultSpecifier":
        case "ImportNamespaceSpecifier":
        case "ImportSpecifier":
          return false;
        case "ImportAttribute":
          return false;
        case "JSXAttribute":
          return false;
        case "ObjectPattern":
        case "ArrayPattern":
          return false;
        case "MetaProperty":
          return false;
        case "ObjectTypeProperty":
          return parent.key !== node;
        case "TSEnumMember":
          return parent.id !== node;
        case "TSPropertySignature":
          if (parent.key === node) {
            return !!parent.computed;
          }
          return true;
      }
      return true;
    }
  }
});

// node_modules/@babel/types/lib/validators/isScope.js
var require_isScope = __commonJS({
  "node_modules/@babel/types/lib/validators/isScope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isScope;
    var _index = require_generated();
    function isScope(node, parent) {
      if ((0, _index.isBlockStatement)(node) && ((0, _index.isFunction)(parent) || (0, _index.isCatchClause)(parent))) {
        return false;
      }
      if ((0, _index.isPattern)(node) && ((0, _index.isFunction)(parent) || (0, _index.isCatchClause)(parent))) {
        return true;
      }
      return (0, _index.isScopable)(node);
    }
  }
});

// node_modules/@babel/types/lib/validators/isSpecifierDefault.js
var require_isSpecifierDefault = __commonJS({
  "node_modules/@babel/types/lib/validators/isSpecifierDefault.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isSpecifierDefault;
    var _index = require_generated();
    function isSpecifierDefault(specifier) {
      return (0, _index.isImportDefaultSpecifier)(specifier) || (0, _index.isIdentifier)(specifier.imported || specifier.exported, {
        name: "default"
      });
    }
  }
});

// node_modules/@babel/types/lib/validators/isValidES3Identifier.js
var require_isValidES3Identifier = __commonJS({
  "node_modules/@babel/types/lib/validators/isValidES3Identifier.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isValidES3Identifier;
    var _isValidIdentifier = require_isValidIdentifier();
    var RESERVED_WORDS_ES3_ONLY = /* @__PURE__ */ new Set(["abstract", "boolean", "byte", "char", "double", "enum", "final", "float", "goto", "implements", "int", "interface", "long", "native", "package", "private", "protected", "public", "short", "static", "synchronized", "throws", "transient", "volatile"]);
    function isValidES3Identifier(name) {
      return (0, _isValidIdentifier.default)(name) && !RESERVED_WORDS_ES3_ONLY.has(name);
    }
  }
});

// node_modules/@babel/types/lib/validators/isVar.js
var require_isVar = __commonJS({
  "node_modules/@babel/types/lib/validators/isVar.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isVar;
    var _index = require_generated();
    var _index2 = require_constants();
    function isVar(node) {
      return (0, _index.isVariableDeclaration)(node, {
        kind: "var"
      }) && !node[_index2.BLOCK_SCOPED_SYMBOL];
    }
  }
});

// node_modules/@babel/types/lib/converters/gatherSequenceExpressions.js
var require_gatherSequenceExpressions = __commonJS({
  "node_modules/@babel/types/lib/converters/gatherSequenceExpressions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = gatherSequenceExpressions;
    var _getBindingIdentifiers = require_getBindingIdentifiers();
    var _index = require_generated();
    var _index2 = require_generated2();
    var _productions = require_productions();
    var _cloneNode = require_cloneNode();
    function gatherSequenceExpressions(nodes, declars) {
      const exprs = [];
      let ensureLastUndefined = true;
      for (const node of nodes) {
        if (!(0, _index.isEmptyStatement)(node)) {
          ensureLastUndefined = false;
        }
        if ((0, _index.isExpression)(node)) {
          exprs.push(node);
        } else if ((0, _index.isExpressionStatement)(node)) {
          exprs.push(node.expression);
        } else if ((0, _index.isVariableDeclaration)(node)) {
          if (node.kind !== "var") return;
          for (const declar of node.declarations) {
            const bindings = (0, _getBindingIdentifiers.default)(declar);
            for (const key of Object.keys(bindings)) {
              declars.push({
                kind: node.kind,
                id: (0, _cloneNode.default)(bindings[key])
              });
            }
            if (declar.init) {
              exprs.push((0, _index2.assignmentExpression)("=", declar.id, declar.init));
            }
          }
          ensureLastUndefined = true;
        } else if ((0, _index.isIfStatement)(node)) {
          const consequent = node.consequent ? gatherSequenceExpressions([node.consequent], declars) : (0, _productions.buildUndefinedNode)();
          const alternate = node.alternate ? gatherSequenceExpressions([node.alternate], declars) : (0, _productions.buildUndefinedNode)();
          if (!consequent || !alternate) return;
          exprs.push((0, _index2.conditionalExpression)(node.test, consequent, alternate));
        } else if ((0, _index.isBlockStatement)(node)) {
          const body = gatherSequenceExpressions(node.body, declars);
          if (!body) return;
          exprs.push(body);
        } else if ((0, _index.isEmptyStatement)(node)) {
          if (nodes.indexOf(node) === 0) {
            ensureLastUndefined = true;
          }
        } else {
          return;
        }
      }
      if (ensureLastUndefined) {
        exprs.push((0, _productions.buildUndefinedNode)());
      }
      if (exprs.length === 1) {
        return exprs[0];
      } else {
        return (0, _index2.sequenceExpression)(exprs);
      }
    }
  }
});

// node_modules/@babel/types/lib/converters/toSequenceExpression.js
var require_toSequenceExpression = __commonJS({
  "node_modules/@babel/types/lib/converters/toSequenceExpression.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = toSequenceExpression;
    var _gatherSequenceExpressions = require_gatherSequenceExpressions();
    function toSequenceExpression(nodes, scope) {
      if (!(nodes != null && nodes.length)) return;
      const declars = [];
      const result = (0, _gatherSequenceExpressions.default)(nodes, declars);
      if (!result) return;
      for (const declar of declars) {
        scope.push(declar);
      }
      return result;
    }
  }
});

// node_modules/@babel/types/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/@babel/types/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _exportNames = {
      react: true,
      assertNode: true,
      createTypeAnnotationBasedOnTypeof: true,
      createUnionTypeAnnotation: true,
      createFlowUnionType: true,
      createTSUnionType: true,
      cloneNode: true,
      clone: true,
      cloneDeep: true,
      cloneDeepWithoutLoc: true,
      cloneWithoutLoc: true,
      addComment: true,
      addComments: true,
      inheritInnerComments: true,
      inheritLeadingComments: true,
      inheritsComments: true,
      inheritTrailingComments: true,
      removeComments: true,
      ensureBlock: true,
      toBindingIdentifierName: true,
      toBlock: true,
      toComputedKey: true,
      toExpression: true,
      toIdentifier: true,
      toKeyAlias: true,
      toStatement: true,
      valueToNode: true,
      appendToMemberExpression: true,
      inherits: true,
      prependToMemberExpression: true,
      removeProperties: true,
      removePropertiesDeep: true,
      removeTypeDuplicates: true,
      getAssignmentIdentifiers: true,
      getBindingIdentifiers: true,
      getOuterBindingIdentifiers: true,
      getFunctionName: true,
      traverse: true,
      traverseFast: true,
      shallowEqual: true,
      is: true,
      isBinding: true,
      isBlockScoped: true,
      isImmutable: true,
      isLet: true,
      isNode: true,
      isNodesEquivalent: true,
      isPlaceholderType: true,
      isReferenced: true,
      isScope: true,
      isSpecifierDefault: true,
      isType: true,
      isValidES3Identifier: true,
      isValidIdentifier: true,
      isVar: true,
      matchesPattern: true,
      validate: true,
      buildMatchMemberExpression: true,
      __internal__deprecationWarning: true
    };
    Object.defineProperty(exports, "__internal__deprecationWarning", {
      enumerable: true,
      get: function() {
        return _deprecationWarning.default;
      }
    });
    Object.defineProperty(exports, "addComment", {
      enumerable: true,
      get: function() {
        return _addComment.default;
      }
    });
    Object.defineProperty(exports, "addComments", {
      enumerable: true,
      get: function() {
        return _addComments.default;
      }
    });
    Object.defineProperty(exports, "appendToMemberExpression", {
      enumerable: true,
      get: function() {
        return _appendToMemberExpression.default;
      }
    });
    Object.defineProperty(exports, "assertNode", {
      enumerable: true,
      get: function() {
        return _assertNode.default;
      }
    });
    Object.defineProperty(exports, "buildMatchMemberExpression", {
      enumerable: true,
      get: function() {
        return _buildMatchMemberExpression.default;
      }
    });
    Object.defineProperty(exports, "clone", {
      enumerable: true,
      get: function() {
        return _clone.default;
      }
    });
    Object.defineProperty(exports, "cloneDeep", {
      enumerable: true,
      get: function() {
        return _cloneDeep.default;
      }
    });
    Object.defineProperty(exports, "cloneDeepWithoutLoc", {
      enumerable: true,
      get: function() {
        return _cloneDeepWithoutLoc.default;
      }
    });
    Object.defineProperty(exports, "cloneNode", {
      enumerable: true,
      get: function() {
        return _cloneNode.default;
      }
    });
    Object.defineProperty(exports, "cloneWithoutLoc", {
      enumerable: true,
      get: function() {
        return _cloneWithoutLoc.default;
      }
    });
    Object.defineProperty(exports, "createFlowUnionType", {
      enumerable: true,
      get: function() {
        return _createFlowUnionType.default;
      }
    });
    Object.defineProperty(exports, "createTSUnionType", {
      enumerable: true,
      get: function() {
        return _createTSUnionType.default;
      }
    });
    Object.defineProperty(exports, "createTypeAnnotationBasedOnTypeof", {
      enumerable: true,
      get: function() {
        return _createTypeAnnotationBasedOnTypeof.default;
      }
    });
    Object.defineProperty(exports, "createUnionTypeAnnotation", {
      enumerable: true,
      get: function() {
        return _createFlowUnionType.default;
      }
    });
    Object.defineProperty(exports, "ensureBlock", {
      enumerable: true,
      get: function() {
        return _ensureBlock.default;
      }
    });
    Object.defineProperty(exports, "getAssignmentIdentifiers", {
      enumerable: true,
      get: function() {
        return _getAssignmentIdentifiers.default;
      }
    });
    Object.defineProperty(exports, "getBindingIdentifiers", {
      enumerable: true,
      get: function() {
        return _getBindingIdentifiers.default;
      }
    });
    Object.defineProperty(exports, "getFunctionName", {
      enumerable: true,
      get: function() {
        return _getFunctionName.default;
      }
    });
    Object.defineProperty(exports, "getOuterBindingIdentifiers", {
      enumerable: true,
      get: function() {
        return _getOuterBindingIdentifiers.default;
      }
    });
    Object.defineProperty(exports, "inheritInnerComments", {
      enumerable: true,
      get: function() {
        return _inheritInnerComments.default;
      }
    });
    Object.defineProperty(exports, "inheritLeadingComments", {
      enumerable: true,
      get: function() {
        return _inheritLeadingComments.default;
      }
    });
    Object.defineProperty(exports, "inheritTrailingComments", {
      enumerable: true,
      get: function() {
        return _inheritTrailingComments.default;
      }
    });
    Object.defineProperty(exports, "inherits", {
      enumerable: true,
      get: function() {
        return _inherits.default;
      }
    });
    Object.defineProperty(exports, "inheritsComments", {
      enumerable: true,
      get: function() {
        return _inheritsComments.default;
      }
    });
    Object.defineProperty(exports, "is", {
      enumerable: true,
      get: function() {
        return _is.default;
      }
    });
    Object.defineProperty(exports, "isBinding", {
      enumerable: true,
      get: function() {
        return _isBinding.default;
      }
    });
    Object.defineProperty(exports, "isBlockScoped", {
      enumerable: true,
      get: function() {
        return _isBlockScoped.default;
      }
    });
    Object.defineProperty(exports, "isImmutable", {
      enumerable: true,
      get: function() {
        return _isImmutable.default;
      }
    });
    Object.defineProperty(exports, "isLet", {
      enumerable: true,
      get: function() {
        return _isLet.default;
      }
    });
    Object.defineProperty(exports, "isNode", {
      enumerable: true,
      get: function() {
        return _isNode.default;
      }
    });
    Object.defineProperty(exports, "isNodesEquivalent", {
      enumerable: true,
      get: function() {
        return _isNodesEquivalent.default;
      }
    });
    Object.defineProperty(exports, "isPlaceholderType", {
      enumerable: true,
      get: function() {
        return _isPlaceholderType.default;
      }
    });
    Object.defineProperty(exports, "isReferenced", {
      enumerable: true,
      get: function() {
        return _isReferenced.default;
      }
    });
    Object.defineProperty(exports, "isScope", {
      enumerable: true,
      get: function() {
        return _isScope.default;
      }
    });
    Object.defineProperty(exports, "isSpecifierDefault", {
      enumerable: true,
      get: function() {
        return _isSpecifierDefault.default;
      }
    });
    Object.defineProperty(exports, "isType", {
      enumerable: true,
      get: function() {
        return _isType.default;
      }
    });
    Object.defineProperty(exports, "isValidES3Identifier", {
      enumerable: true,
      get: function() {
        return _isValidES3Identifier.default;
      }
    });
    Object.defineProperty(exports, "isValidIdentifier", {
      enumerable: true,
      get: function() {
        return _isValidIdentifier.default;
      }
    });
    Object.defineProperty(exports, "isVar", {
      enumerable: true,
      get: function() {
        return _isVar.default;
      }
    });
    Object.defineProperty(exports, "matchesPattern", {
      enumerable: true,
      get: function() {
        return _matchesPattern.default;
      }
    });
    Object.defineProperty(exports, "prependToMemberExpression", {
      enumerable: true,
      get: function() {
        return _prependToMemberExpression.default;
      }
    });
    exports.react = void 0;
    Object.defineProperty(exports, "removeComments", {
      enumerable: true,
      get: function() {
        return _removeComments.default;
      }
    });
    Object.defineProperty(exports, "removeProperties", {
      enumerable: true,
      get: function() {
        return _removeProperties.default;
      }
    });
    Object.defineProperty(exports, "removePropertiesDeep", {
      enumerable: true,
      get: function() {
        return _removePropertiesDeep.default;
      }
    });
    Object.defineProperty(exports, "removeTypeDuplicates", {
      enumerable: true,
      get: function() {
        return _removeTypeDuplicates.default;
      }
    });
    Object.defineProperty(exports, "shallowEqual", {
      enumerable: true,
      get: function() {
        return _shallowEqual.default;
      }
    });
    Object.defineProperty(exports, "toBindingIdentifierName", {
      enumerable: true,
      get: function() {
        return _toBindingIdentifierName.default;
      }
    });
    Object.defineProperty(exports, "toBlock", {
      enumerable: true,
      get: function() {
        return _toBlock.default;
      }
    });
    Object.defineProperty(exports, "toComputedKey", {
      enumerable: true,
      get: function() {
        return _toComputedKey.default;
      }
    });
    Object.defineProperty(exports, "toExpression", {
      enumerable: true,
      get: function() {
        return _toExpression.default;
      }
    });
    Object.defineProperty(exports, "toIdentifier", {
      enumerable: true,
      get: function() {
        return _toIdentifier.default;
      }
    });
    Object.defineProperty(exports, "toKeyAlias", {
      enumerable: true,
      get: function() {
        return _toKeyAlias.default;
      }
    });
    Object.defineProperty(exports, "toStatement", {
      enumerable: true,
      get: function() {
        return _toStatement.default;
      }
    });
    Object.defineProperty(exports, "traverse", {
      enumerable: true,
      get: function() {
        return _traverse.default;
      }
    });
    Object.defineProperty(exports, "traverseFast", {
      enumerable: true,
      get: function() {
        return _traverseFast.default;
      }
    });
    Object.defineProperty(exports, "validate", {
      enumerable: true,
      get: function() {
        return _validate.default;
      }
    });
    Object.defineProperty(exports, "valueToNode", {
      enumerable: true,
      get: function() {
        return _valueToNode.default;
      }
    });
    var _isReactComponent = require_isReactComponent();
    var _isCompatTag = require_isCompatTag();
    var _buildChildren = require_buildChildren();
    var _assertNode = require_assertNode();
    var _index = require_generated3();
    Object.keys(_index).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
      if (key in exports && exports[key] === _index[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _index[key];
        }
      });
    });
    var _createTypeAnnotationBasedOnTypeof = require_createTypeAnnotationBasedOnTypeof();
    var _createFlowUnionType = require_createFlowUnionType();
    var _createTSUnionType = require_createTSUnionType();
    var _index2 = require_generated2();
    Object.keys(_index2).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
      if (key in exports && exports[key] === _index2[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _index2[key];
        }
      });
    });
    var _uppercase = require_uppercase();
    Object.keys(_uppercase).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
      if (key in exports && exports[key] === _uppercase[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _uppercase[key];
        }
      });
    });
    var _productions = require_productions();
    Object.keys(_productions).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
      if (key in exports && exports[key] === _productions[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _productions[key];
        }
      });
    });
    var _cloneNode = require_cloneNode();
    var _clone = require_clone();
    var _cloneDeep = require_cloneDeep();
    var _cloneDeepWithoutLoc = require_cloneDeepWithoutLoc();
    var _cloneWithoutLoc = require_cloneWithoutLoc();
    var _addComment = require_addComment();
    var _addComments = require_addComments();
    var _inheritInnerComments = require_inheritInnerComments();
    var _inheritLeadingComments = require_inheritLeadingComments();
    var _inheritsComments = require_inheritsComments();
    var _inheritTrailingComments = require_inheritTrailingComments();
    var _removeComments = require_removeComments();
    var _index3 = require_generated4();
    Object.keys(_index3).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
      if (key in exports && exports[key] === _index3[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _index3[key];
        }
      });
    });
    var _index4 = require_constants();
    Object.keys(_index4).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
      if (key in exports && exports[key] === _index4[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _index4[key];
        }
      });
    });
    var _ensureBlock = require_ensureBlock();
    var _toBindingIdentifierName = require_toBindingIdentifierName();
    var _toBlock = require_toBlock();
    var _toComputedKey = require_toComputedKey();
    var _toExpression = require_toExpression();
    var _toIdentifier = require_toIdentifier();
    var _toKeyAlias = require_toKeyAlias();
    var _toStatement = require_toStatement();
    var _valueToNode = require_valueToNode();
    var _index5 = require_definitions();
    Object.keys(_index5).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
      if (key in exports && exports[key] === _index5[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _index5[key];
        }
      });
    });
    var _appendToMemberExpression = require_appendToMemberExpression();
    var _inherits = require_inherits();
    var _prependToMemberExpression = require_prependToMemberExpression();
    var _removeProperties = require_removeProperties();
    var _removePropertiesDeep = require_removePropertiesDeep();
    var _removeTypeDuplicates = require_removeTypeDuplicates();
    var _getAssignmentIdentifiers = require_getAssignmentIdentifiers();
    var _getBindingIdentifiers = require_getBindingIdentifiers();
    var _getOuterBindingIdentifiers = require_getOuterBindingIdentifiers();
    var _getFunctionName = require_getFunctionName();
    var _traverse = require_traverse();
    Object.keys(_traverse).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
      if (key in exports && exports[key] === _traverse[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _traverse[key];
        }
      });
    });
    var _traverseFast = require_traverseFast();
    var _shallowEqual = require_shallowEqual();
    var _is = require_is();
    var _isBinding = require_isBinding();
    var _isBlockScoped = require_isBlockScoped();
    var _isImmutable = require_isImmutable();
    var _isLet = require_isLet();
    var _isNode = require_isNode();
    var _isNodesEquivalent = require_isNodesEquivalent();
    var _isPlaceholderType = require_isPlaceholderType();
    var _isReferenced = require_isReferenced();
    var _isScope = require_isScope();
    var _isSpecifierDefault = require_isSpecifierDefault();
    var _isType = require_isType();
    var _isValidES3Identifier = require_isValidES3Identifier();
    var _isValidIdentifier = require_isValidIdentifier();
    var _isVar = require_isVar();
    var _matchesPattern = require_matchesPattern();
    var _validate = require_validate();
    var _buildMatchMemberExpression = require_buildMatchMemberExpression();
    var _index6 = require_generated();
    Object.keys(_index6).forEach(function(key) {
      if (key === "default" || key === "__esModule") return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
      if (key in exports && exports[key] === _index6[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _index6[key];
        }
      });
    });
    var _deprecationWarning = require_deprecationWarning();
    var react = exports.react = {
      isReactComponent: _isReactComponent.default,
      isCompatTag: _isCompatTag.default,
      buildChildren: _buildChildren.default
    };
    {
      exports.toSequenceExpression = require_toSequenceExpression().default;
    }
  }
});

// src/main.ts
import { minimatch } from "minimatch";
import { dirname, relative as relative2, resolve as resolve2 } from "node:path";

// src/find-import-paths.ts
var import_types = __toESM(require_lib3(), 1);
function findImportPaths(file) {
  const importInfos = [];
  function traverse(node) {
    if ((0, import_types.isImportDeclaration)(node)) {
      importInfos.push({
        path: node.source.value,
        line: node.source.loc?.start?.line ?? NaN,
        column: (node.source.loc?.start?.column ?? NaN) + 1
      });
      return;
    }
    if ("body" in node && Array.isArray(node.body)) {
      node.body.forEach((v) => traverse(v));
      return;
    }
  }
  traverse(file.program);
  return importInfos;
}

// src/find-ts-files.ts
import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
function findTsFiles(rootDir, ig) {
  const results = [];
  function searchDir(dir) {
    const files = readdirSync(dir);
    for (const file of files) {
      const fullPath = join(dir, file);
      if (ig.ignores(relative(rootDir, fullPath))) {
        continue;
      }
      const stat = statSync(fullPath);
      const isTypeScriptFile = stat.isFile() && (file.endsWith(".ts") || file.endsWith(".tsx"));
      if (stat.isDirectory()) {
        searchDir(fullPath);
      } else if (isTypeScriptFile) {
        results.push(fullPath);
      }
    }
  }
  searchDir(rootDir);
  return results;
}

// src/import-config.ts
import { transformFileSync } from "@babel/core";
import { flatten, safeParse } from "valibot";
import { existsSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

// src/config.ts
import {
  array,
  boolean,
  custom,
  function_,
  minLength,
  optional,
  pipe,
  strictObject,
  string,
  union
} from "valibot";
var path$ = pipe(string(), minLength(1));
var glob$ = pipe(string(), minLength(1));
var regexp$ = custom((v) => v instanceof RegExp);
var scope$ = union([
  strictObject({
    scope: glob$,
    allowed: pipe(array(glob$), minLength(0)),
    disallowSiblingImportsUnlessAllow: optional(boolean())
  }),
  strictObject({
    scope: glob$,
    matchPattern: regexp$,
    allowed: function_(),
    disallowSiblingImportsUnlessAllow: optional(boolean())
  })
]);
var config$ = strictObject({
  default: strictObject({
    root: path$,
    scopes: pipe(array(scope$), minLength(0))
  })
});

// src/import-config.ts
async function importConfig(path) {
  if (!existsSync(path)) {
    throw new Error(`Configuration file not found at: ${path}`);
  }
  const result = transformFileSync(path, {
    presets: ["@babel/preset-typescript"],
    filename: path,
    sourceMaps: false
  });
  const code = result?.code ?? "";
  const tempConfigPath = resolve(tmpdir(), `acrop-${Date.now()}.js`);
  let mod;
  try {
    writeFileSync(tempConfigPath, code);
    mod = await import(tempConfigPath);
  } finally {
    unlinkSync(tempConfigPath);
  }
  const parseResult = safeParse(config$, mod);
  if (!parseResult.success) {
    console.log(flatten(parseResult.issues));
    throw new Error();
  }
  return parseResult.output.default;
}

// src/load-gitignore.ts
import ignore from "ignore";
import { existsSync as existsSync2, readFileSync } from "node:fs";
import { join as join2 } from "node:path";
function loadGitignore(dir) {
  const gitignorePath = join2(dir, ".gitignore");
  if (existsSync2(gitignorePath)) {
    const content = readFileSync(gitignorePath, "utf-8");
    return ignore().add(content);
  }
  return ignore();
}

// src/make-ast.ts
import { parse } from "@babel/parser";
import { readFileSync as readFileSync2 } from "node:fs";
import { extname } from "node:path";
function makeAst(path) {
  const code = readFileSync2(path, "utf-8");
  const ext = extname(path);
  const basePlugins = ["typescript"];
  return parse(code, {
    sourceType: "module",
    plugins: ext === ".tsx" ? [...basePlugins, "jsx"] : basePlugins
  });
}

// src/output-report.ts
import { underline } from "yoctocolors";
function outputReport(targetPath, results) {
  if (results.length === 0) {
    return;
  }
  console.log(underline(targetPath));
  results.forEach((v) => {
    console.log([[v.line, v.column].join(":"), v.path].join(" "));
  });
  console.log("");
}

// src/main.ts
async function main() {
  const args = process.argv.slice(2);
  const cwd = process.cwd();
  const absolutePath = (() => {
    const configPath = args[0] ?? "";
    if (configPath === "") {
      throw new Error("Configuration file not found");
    }
    return resolve2(cwd, configPath);
  })();
  const needsReportUnscoped = args.includes("--report-unscoped");
  const config = await importConfig(absolutePath);
  const root = resolve2(cwd, config.root);
  const ig = loadGitignore(root);
  const relativeTsFiles = findTsFiles(root, ig).map(
    (v) => `./${relative2(root, v)}`
  );
  const scoped = /* @__PURE__ */ new Set();
  config.scopes.forEach((declaration) => {
    const filteredTsFiles = relativeTsFiles.filter((tsFile) => minimatch(tsFile, declaration.scope)).map((v) => resolve2(root, v));
    filteredTsFiles.forEach((tsPath) => {
      if (scoped.has(tsPath)) {
        return;
      }
      const ast = makeAst(tsPath);
      const infoArray = findImportPaths(ast).map(
        (v) => {
          return {
            path: `./${relative2(root, resolve2(dirname(tsPath), v.path))}`,
            line: v.line,
            column: v.column
          };
        }
      );
      const result = infoArray.flatMap((info) => {
        if (typeof declaration.allowed === "object" && Array.isArray(declaration.allowed)) {
          const allowed = [
            ...declaration.allowed,
            declaration.disallowSiblingImportsUnlessAllow ?? false ? null : `./${relative2(root, dirname(tsPath))}/**/*`
          ].filter((v) => v !== null).flatMap((v) => [v, v.replace(/\/\*\*\/\*$/, "")]);
          return allowed.reduce(
            (acc, allowedPath) => {
              if (minimatch(info.path, allowedPath)) {
                acc.isAllowed = true;
              }
              return acc;
            },
            {
              path: info.path,
              isAllowed: false,
              line: info.line,
              column: info.column
            }
          );
        }
        if (typeof declaration.allowed === "function" && declaration.matchPattern !== void 0 && declaration.matchPattern !== null) {
          const pattern = declaration.matchPattern;
          const matched = `./${relative2(root, dirname(tsPath))}`.match(
            pattern
          );
          const allowed = [
            ...declaration.allowed(matched),
            declaration.disallowSiblingImportsUnlessAllow ?? false ? null : `./${relative2(root, dirname(tsPath))}/**/*`
          ].filter((v) => v !== null).flatMap((v) => [v, v.replace(/\/\*\*\/\*$/, "")]);
          return allowed.reduce(
            (acc, allowedPath) => {
              if (minimatch(info.path, allowedPath)) {
                acc.isAllowed = true;
              }
              return acc;
            },
            {
              path: info.path,
              isAllowed: false,
              line: info.line,
              column: info.column
            }
          );
        }
        return [];
      }).filter((v) => !v.isAllowed);
      outputReport(`./${relative2(root, tsPath)}`, result);
      scoped.add(tsPath);
    });
  });
  if (needsReportUnscoped) {
    relativeTsFiles.filter((v) => !scoped.has(resolve2(root, v))).forEach((v) => console.log(v));
  }
}

// index.ts
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
